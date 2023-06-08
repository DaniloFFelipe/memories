export type Left<E> = { success: false; error: E }
export type Right<V> = { success: true; data: V }

export type Either<V, E = Error> = Left<E> | Right<V>

export function left<E = Error>(error: E): Left<E> {
  return {
    success: false,
    error,
  }
}

export function right<V>(data: V): Right<V> {
  return {
    success: true,
    data,
  }
}

export async function check<V, E = Error, R = void>(
  either: Either<V, E>,
  onSuccess: (data: V) => Promise<R>,
  onFailure: (error: E) => Promise<R>,
): Promise<R> {
  switch (either.success) {
    case true:
      return await onSuccess(either.data)
    case false:
      return await onFailure(either.error)
  }
}
