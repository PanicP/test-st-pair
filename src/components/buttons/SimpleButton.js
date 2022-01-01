import { Button } from 'antd'
import './SimpleButton.scss'

const SimpleButton = ({ text, onClick, isSelected }) => {

    return <>
        <Button className={ isSelected && 'selected' } onClick={onClick}>
            { text }
        </Button>
    </>
}

export default SimpleButton