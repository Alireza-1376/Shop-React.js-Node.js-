function Table({ children }:{children:React.ReactNode}) {
    return (
        <div>
            <table className="w-full min-w-162.5 border-collapse text-right">{children}</table>
        </div>
    )
}

export default Table;

function TableHeader({ children }:{children:React.ReactNode}) {
    return (
        <thead>{children}</thead>
    )
}

function TableBody({ children }:{children:React.ReactNode}) {
    return (
        <tbody>{children}</tbody>
    )
}

function TableRowHead({ children }:{children:React.ReactNode}) {
    return (
        <tr className="border-b border-slate-100 bg-slate-50/70">
            {children}
        </tr>
    )
}

function TableRowBody({ children }:{children:React.ReactNode}) {
    return (
        <tr className="border-b border-slate-50 last:border-0 transition-colors hover:bg-emerald-50/30">{children}</tr>
    )
}


Table.Header = TableHeader
Table.Body = TableBody
Table.RowHead = TableRowHead;
Table.RowBody = TableRowBody;