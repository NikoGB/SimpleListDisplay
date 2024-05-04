function NotFound({ statusCode }) {
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server : Probablemente esta mala la URL`
                : 'Esta mala URL'}
        </p>
    )
}


export default NotFound