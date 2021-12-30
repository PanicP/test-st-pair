import { Button } from 'antd'

const SimpleButton = ({ text, onClick }) => {

    return <>
        <Button onClick={onClick}>
            { text }
        </Button>
    </>
}

export default SimpleButton