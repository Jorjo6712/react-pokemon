
interface ImageProps {
   imgSrc: string
}

const Image: React.FC<ImageProps> = ({imgSrc}) => {
    return (
        <>
            <img className="scale-50 w-11/12" src={imgSrc}></img>
        </>
    )
}

export default Image