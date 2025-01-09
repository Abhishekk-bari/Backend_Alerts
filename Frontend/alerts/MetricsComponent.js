import React,{ useEffect } from 'react'


function MetricsComponent() {

    useEffect (() => {
        axios.get('http://localhost:3000/api/metrics')
        .then(response => {
            setMatrics
        })
    })
  return (
    <div>
      
    </div>
  )
}

export default MetricsComponent;
