export default function Input(props){
    return(
        <div>
            {/* image input */}
            <input onChange={props.handleImageSelect} type="file" accept="image/*" />
        </div>
    )
}