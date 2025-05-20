import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { AuthError, SupabaseClient, User } from '@supabase/supabase-js'
import { gql } from 'graphql-tag'
import { NextRequest } from 'next/server'

// TESTING
// import mockExpenses from '@/lib/constants/mockExpenses.json'
import { createServerSupabaseClient } from '@/lib/supabase'
import { Expense } from '@/types/expense'
import { Database } from '@/types/supabase'

import { expensesSchema } from './schemas'
import { combineMonthlyExpenses } from './utils'

const sanitizeExpense = (expense: Expense) => {
  return {
    ...expense,
    // name: sanitizeHtml(expense.name, {
    //   allowedTags: [],
    //   allowedAttributes: {},
    // }),
  }
}

const typeDefs = gql`
  type Expense {
    date: String
    category: String
    cost_in_cents: Int
  }

  type MonthlyExpense {
    month: String!
    Apps: Int
    Car: Int
    Clothing: Int
    Food: Int
    Health: Int
    Home: Int
    Office: Int
    Pets: Int
    Tools: Int
    Travel: Int
  }

  type CombinedMonthlyExpenses {
    monthlyExpenses: [MonthlyExpense!]!
    categories: [String!]!
    monthYearDomain: [String!]!
  }

  type Query {
    rawExpenses: [Expense]
    combinedMonthlyExpenses(
      startDate: String!
      endDate: String!
    ): CombinedMonthlyExpenses
  }

  input ExpenseInput {
    date: String!
    category: String!
    cost_in_cents: Int!
  }

  type Mutation {
    addExpenses(expenses: [ExpenseInput!]!): [Expense]
  }

  type Mutation {
    deleteUserExpenses: Boolean!
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
    .select('date, category, cost_in_cents')
    .eq('user_id', user.id)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false })

  if (error) {
    throw new Error('Failed to fetch expenses')
  }

  return data as Expense[]
}

const resolvers = {
  Query: {
    rawExpenses: async (
      _parent: undefined,
      { startDate, endDate }: { startDate: string; endDate: string },
      { user, authError, supabase }: ApolloContext
    ) => {
      if (!user || authError) {
        throw new Error('Unauthorized')
      }

      return await getUserExpenses(user, supabase, startDate, endDate)

      // TESTING
      // return mockExpenses
    },
    combinedMonthlyExpenses: async (
      _parent: undefined,
      { startDate, endDate }: { startDate: string; endDate: string },
      { user, authError, supabase }: ApolloContext
    ) => {
      if (!user || authError) {
        throw new Error('Unauthorized')
      }

      const expenses = await getUserExpenses(user, supabase, startDate, endDate)
      return combineMonthlyExpenses(expenses)

      // TESTING
      // const combined = combineMonthlyExpenses(mockExpenses as Expense[])
      // return combined
    },
  },
  Mutation: {
    addExpenses: async (
      _parent: undefined,
      { expenses }: { expenses: Expense[] },
      { user, authError, supabase }: ApolloContext
    ) => {
      if (!user || authError) {
        throw new Error('Unauthorized')
      }

      const parsedExpenses = expensesSchema.parse(expenses)
      const cleanedExpenses = parsedExpenses.map((expense: Expense) => ({
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
