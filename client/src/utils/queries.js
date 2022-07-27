import { gql } from "@apollo/client";
//import { gql } from "@apollo/client";

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        bookCount
        saveBooks {
            bookId
            author
            description
            title
            image
            link
        }
    }
}
`;