export type ValueFindBy<T> = keyof (Partial<T> & { id?: string })
export type FindBy<T> = keyof (Partial<T> & { id?: string })
export type FindByT<
  T,
  K extends keyof (Partial<T> & { id?: string }),
> = (Partial<T> & { id?: string })[K]

export type FindByOption<T> = {
  field: FindBy<T>
  value: FindByT<T, FindBy<T>>
}
