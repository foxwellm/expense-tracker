import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { AuthError, SupabaseClient, User } from '@supabase/supabase-js'
import { gql } from 'graphql-tag'
import { NextRequest } from 'next/server'
import sanitizeHtml from 'sanitize-html'

import { createServerSupabaseClient } from '@/lib/supabase'
import { CreateExpense, Expense, UpdateExpense } from '@/types/expense'
import { Database } from '@/types/supabase'

import { createExpensesSchema, updateExpenseSchema } from './schemas'

const sanitizeExpense = (expense: CreateExpense | UpdateExpense) => {
  if (!expense?.note) return expense
  return {
    ...expense,
    note: sanitizeHtml(expense.note, {
      allowedTags: [],
      allowedAttributes: {},
    }),
  }
}

const typeDefs = gql`
  type Expense {
    id: ID!
    date: String!
    category: String!
    sub_category: String!
    cost_in_cents: Int!
    note: String
  }

  input ExpenseInput {
    date: String!
    category: String!
    sub_category: String!
    cost_in_cents: Int!
    note: String
  }

  type Mutation {
    addExpenses(expenses: [ExpenseInput!]!): [Expense]
    updateExpense(expenseId: String!, expense: ExpenseInput!): Boolean!
    deleteUserExpenses: Boolean!
    deleteUserExpense(id: ID!): Boolean!
  }

  type Query {
    userExpenses(startDate: String!, endDate: String!): [Expense]
  }
`

type ApolloContext = {
  supabase: SupabaseClient<Database>
  user: User | null
  authError: AuthError | null
}

const getUserExpenses = async (
  user: User,
  supabase: SupabaseClient,
  startDate: string,
  endDate: string
): Promise<Expense[]> => {
  const { data, error } = await supabase
    .from('expenses')
    .select('id, date, category, sub_category, cost_in_cents, note')
    .eq('user_id', user.id)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false })
    .order('category', { ascending: true })
    .order('cost_in_cents', { ascending: false })

  if (error) {
    throw new Error('Failed to fetch expenses')
  }

  return data as Expense[]
}

const resolvers = {
  Query: {
    userExpenses: async (
      _parent: undefined,
      { startDate, endDate }: { startDate: string; endDate: string },
      { user, authError, supabase }: ApolloContext
    ) => {
      if (!user || authError) {
        throw new Error('Unauthorized')
      }

      return await getUserExpenses(user, supabase, startDate, endDate)
    },
  },
  Mutation: {
    addExpenses: async (
      _parent: undefined,
      { expenses }: { expenses: CreateExpense[] },
      { user, authError, supabase }: ApolloContext
    ) => {
      if (!user || authError) {
        throw new Error('Unauthorized')
      }

      const parsedExpenses = createExpensesSchema.parse(expenses)
      const cleanedExpenses = parsedExpenses.map((expense: CreateExpense) => ({
        ...sanitizeExpense(expense),
        user_id: user.id,
      }))

      const { data, error } = await supabase
        .from('expenses')
        .insert(cleanedExpenses)
        .select()

      if (error) throw new Error(error.message)
      return data
    },
    updateExpense: async (
      _parent: undefined,
      { expenseId, expense }: { expenseId: string; expense: UpdateExpense },
      { user, authError, supabase }: ApolloContext
    ) => {
      if (!user || authError) {
        throw new Error('Unauthorized')
      }

      const parsedExpense = updateExpenseSchema.parse(expense)
      const cleanedExpense = {
        ...sanitizeExpense(parsedExpense),
      }

      const { data, error } = await supabase
        .from('expenses')
        .update(cleanedExpense)
        .eq('id', expenseId)
        .eq('user_id', user.id)
        .select()

      if (error) throw new Error(error.message)

      if (!data || data.length === 0) {
        throw new Error('Expense not found')
      }

      return true
    },
    deleteUserExpenses: async (
      _parent: undefined,
      _args: undefined,
      { user, authError, supabase }: ApolloContext
    ) => {
      if (!user || authError) {
        throw new Error('Unauthorized')
      }

      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('user_id', user.id)

      if (error) throw new Error(error.message)

      return true
    },
    deleteUserExpense: async (
      _parent: undefined,
      { id }: { id: Expense['id'] },
      { user, authError, supabase }: ApolloContext
    ) => {
      if (!user || authError) {
        throw new Error('Unauthorized')
      }

      const { error: deleteError } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (deleteError) throw new Error(deleteError.message)

      return true
    },
  },
}

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler<NextRequest, ApolloContext>(
  server,
  {
    context: async () => {
      const supabase = await createServerSupabaseClient()
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      return {
        supabase,
        user,
        authError,
      }
    },
  }
)

function withContext(handlerFn: typeof handler) {
  return (req: NextRequest) => handlerFn(req)
}

export const GET = withContext(handler)
export const POST = withContext(handler)
