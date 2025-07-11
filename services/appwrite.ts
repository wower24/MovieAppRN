import { Client, Databases, ID, Query } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const USERS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

//track searches made by the user
export const updateSearchCount = async (query: string, movie: Movie) => {

    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.equal('searchTerm', query)
            ]
        )

        console.log(result);
        // check if a record of that search has already been stored
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    // if yes, increment the count
                    count: existingMovie.count + 1
                }
            )
        } else {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    count: 1,
                    title: movie.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
            )
        }
        // if not, create a new record with count 1
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const getTrendingMovies =
    async (): Promise<TrendingMovie[] | undefined> => {
        try {
            const result = await database.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.limit(5),
                    Query.orderDesc('count')
                ]
            )

            return result.documents as unknown as TrendingMovie[];

        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    export const getUserInfo = async (userId: number): Promise<UserInfo | undefined> => {
        try {
            const result = await database.listDocuments(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                [
                    Query.equal('userId', userId)
                ]
            )

            return result.documents[0] as unknown as UserInfo;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    export const updateWatchedMovies = async (userId: number, movie: MovieDetails | null) => {
        try {
            const userDocs = await database.listDocuments(
            DATABASE_ID,
            USERS_COLLECTION_ID,
            [Query.equal('userId', userId)]
        );

        if (userDocs.documents.length === 0) {
            throw new Error('User not found');
        }
            const userDoc = userDocs.documents[0]
            const docId = userDoc.$id;

            const watchedMovies = userDoc.watchedMovies;
            if( !watchedMovies.includes(movie?.id)) {
                watchedMovies.push(movie?.id)
            }

            const watchtime = userDoc.watchtime + movie?.runtime;

            const result = await database.updateDocument(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                docId,
                {
                   watchedMovies: watchedMovies,
                   watchtime: watchtime
                }
            )
        } catch (error) {
            console.log(error);
            throw error;
        }
    }