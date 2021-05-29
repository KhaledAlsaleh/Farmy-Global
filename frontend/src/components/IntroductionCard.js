import React from 'react'
import { Card } from 'react-bootstrap'
 
const IntroductionCard = ({image, heading, description}) => {
    return (
        <Card className='rounded'>
    <Card.Img src={image} variant='top' style={{height:"200px"}}/>
      <Card.Body>
          <Card.Title as='div'>
            <strong>{heading}</strong>
          </Card.Title>
          <Card.Text as='div'>{description}</Card.Text>
      </Card.Body>
        </Card>
    )
}

export default IntroductionCard
