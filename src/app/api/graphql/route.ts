import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from 'graphql-tag'
import { NextRequest } from 'next/server'

import mockExpenses from '@/lib/constants/mockExpenses.json'
import { expensesSchema } from '@/lib/schemas/expense'
import { createServerSupabaseClient } from '@/lib/supabase'
import { Expense } from '@/types/expense'

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
    Clothing: Int
    Food: Int
    Fuel: Int
    Entertainment: Int
  }

  type CombinedMonthlyExpenses {
    monthlyExpenses: [MonthlyExpense!]!
    categories: [String!]!
    monthYearDomain: [String!]!
  }

  type Query {
    rawExpenses: [Expense]
    combinedMonthlyExpenses: CombinedMonthlyExpenses
  }

  input ExpenseInput {
    date: String!
    category: String!
    cost_in_cents: Int!
  }

  type Mutation {
    addExpenses(expenses: [ExpenseInput!]!): [Expense]
  }
`

const resolvers = {
  // export async function GET(request: NextRequest) {
  // const supabase = await createServerSupabaseClient();

  // const {
  //   data: { user },
  //   error: authError,
  // } = await supabase.auth.getUser();

  // if (authError || !user) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  // TODO: query param date range
  // const url = new URL(request.url);
  // const transform = url.searchParams.get('transform') === 'true';
  // const { data: rawExpenses, error } = await supabase
  //   .from('expenses')
  //   .select('date, expense, cost')
  //   .eq('user_id', user.id);

  // if (error) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }

  // const transformedExpenses = transformExpenses(rawExpenses)
  Query: {
    rawExpenses: async () => {
      return mockExpenses
    },
    combinedMonthlyExpenses: async () => {
      const combined = combineMonthlyExpenses(mockExpenses as Expense[])
      return combined
    },
  },
  Mutation: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addExpenses: async (_: any, args: { expenses: Expense[] }) => {
      const supabase = await createServerSupabaseClient()
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        throw new Error('Unauthorized')
      }

      const parsedExpenses = expensesSchema.parse(args.expenses)
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
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server)

function withContext(handlerFn: typeof handler) {
  return (req: NextRequest) => handlerFn(req)
}

export const GET = withContext(handler)
export const POST = withContext(handler)
