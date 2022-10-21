export default interface IRouteModel {
    path: string
    element: (() => JSX.Element) | React.MemoExoticComponent<() => JSX.Element>
}