import { faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type headerProps = {
    title: string
}
export default function Header({ title }: headerProps) {
    return (
        <div className="flex justify-center font-bold text-4xl">
            {title}<FontAwesomeIcon icon={faList} className="ml-2 my-auto" />
        </div>
    )
}