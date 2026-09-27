import { LiaSpinnerSolid } from "react-icons/lia";
function Loading({ size }: { size: number }) {
    return (
        <span className="animate-spin text-emerald-500">
            <LiaSpinnerSolid size={size} />
        </span>
    )
}

export default Loading;