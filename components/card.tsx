import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>

const Card = ({children}:Props)=>{

    return <div className="group max-w-full border-b first:border-t border-pale-silver border-opacity-60 hover:shadow-md">
        {children}
    </div>
}

export default Card;