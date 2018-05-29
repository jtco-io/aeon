import inMemorySchema from './inMemory'
import { GraphQLSchema } from 'graphql'
import {databaseType} from '../constants'

import Query from './query'
import Mutation from './mutation'

export const databaseSchema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

export default function schema(){
  let schema
  if (process.env.DATABASE_TYPE === databaseType.MEMORY){
    schema = inMemorySchema
  }else {
    schema = databaseSchema
  }
  return schema
}
