import gql from "graphql-tag";

export const LOGIN_USER = gql`
mutations login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;

export const ADD_USER = gql`
mutations addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookId: ID! $authors: [String], $description: String, $title: String, $image: String, $link: String) {
    saveBook(bookId, authors: $authors, description: title: $title, image:$image, link:$link){
        _id
        username
        saveBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook( $bookId: ID!) {
    removeBook(bookId: $bookId) {
        _id
        username
        saveBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}
`;
