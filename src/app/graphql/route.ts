import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import typeDefs from './schema'
import resolvers from './resolver'
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next'

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        (process.env.NODE_ENV === 'production') ? ApolloServerPluginLandingPageProductionDefault() :
            ApolloServerPluginLandingPageLocalDefault({ footer: false, embed: true })
    ],
});


const handler = startServerAndCreateNextHandler<NextRequest>(server, {})

export async function GET(request: NextRequest) {
    return handler(request)
}

export async function POST(request: NextRequest) {
    console.log('request',request)
    return handler(request)
}