type EdenLikeResponse<TData = unknown, TError = unknown> = {
    data: TData | null;
    error: TError | null;
    status: number;
};

type ExtractApiData<TData> = TData extends {
    data?: infer TValue;
}
    ? TValue
    : never;

type UnwrappedApiData<TResponse> = TResponse extends {
    data: infer TData;
}
    ? ExtractApiData<NonNullable<TData>>
    : never;

type ApiErrorEnvelope = {
    error: string;
    message: string;
};

export function unwrapApiData<
    TResponse extends EdenLikeResponse<unknown, unknown>,
>(response: TResponse): UnwrappedApiData<TResponse> | null {
    if (response.error || !response.data) {
        return null;
    }

    if (
        typeof response.data === "object" &&
        response.data !== null &&
        "data" in response.data
    ) {
        return response.data.data as UnwrappedApiData<TResponse>;
    }

    return null;
}

export function isApiNotFound(response: EdenLikeResponse<unknown, unknown>) {
    return response.status === 404;
}

export function getApiErrorMessage(
    response: EdenLikeResponse<unknown, unknown>,
): string | null {
    if (!response.error && !response.data) {
        return null;
    }

    if (
        response.data &&
        typeof response.data === "object" &&
        "message" in response.data &&
        typeof response.data.message === "string"
    ) {
        return response.data.message;
    }

    if (
        response.error &&
        typeof response.error === "object" &&
        "value" in response.error
    ) {
        const value = response.error.value;

        if (
            value &&
            typeof value === "object" &&
            "message" in value &&
            typeof value.message === "string"
        ) {
            return value.message;
        }
    }

    return "Something went wrong.";
}