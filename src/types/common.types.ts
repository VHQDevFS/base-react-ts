import type React from 'react';

export type StringNumeric = string | number;

export type EmptyObjectType = Record<string, never>;

export type RequireField<T extends Record<string, unknown> | object, K extends keyof T> = T &
  Required<Pick<T, K>>;

export type NeverField<T> = T extends Record<string, unknown> | object
  ? Record<keyof T, never>
  : never;

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<ReturnType<FnType>>;

export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

export type GetDeepProp<T extends object, K extends string> = K extends keyof T
  ? T[K]
  : { [P in keyof T]: GetDeepProp<Extract<T[P], object>, K> }[keyof T];

type ConvertCamelCase<S extends string> =
  S extends `${infer S1 extends string}_${infer S2 extends string}${infer S3}`
    ? `${Lowercase<S1>}${Capitalize<S2>}${ConvertCamelCase<S3>}`
    : Lowercase<S>;

export type ObjCamelCase<T> = {
  [K in keyof T as ConvertCamelCase<string & K>]: T[K];
};

// auto complete passing union and string
export type UnionAndString<T extends string> = T | Omit<string, T>;

// using render props or children
export type MaybeElementRenderProps<P extends object = object, E = React.ReactNode> =
  | ((props: P) => E)
  | E;
