export const ApiEndpoint ={
    USER:{
        GET_ALL_USERS:"/users",
        GET_USER_BY_ID:"/users/{userId}",
    },
    TRANSACTIONS:{
        CREATE_TRANSACTION:"/transactions",
        GET_TRANSACTION_BY_USERID:"/transactions/history/{userId}"
    }
}