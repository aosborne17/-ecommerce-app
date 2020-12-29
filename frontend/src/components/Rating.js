import React from 'react'
import PropTypes from 'prop-types'


const Rating = ({value, text, color}) => {
    return (
        <div className="rating">
            {/* Here we are creating five stars and depending on the rating, a certain amount of those stars will be filled or half filled */}
            <span>
                <i style={{color: color}} className={value >=1 ? 'fas fa-star' : value >=0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>

            <span>
                <i style={{color: color}} className={value >=2 ? 'fas fa-star' : value >=1.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{color: color}} className={value >=3 ? 'fas fa-star' : value >=2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{color: color}} className={value >=4 ? 'fas fa-star' : value >=3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{color: color}} className={value >=5 ? 'fas fa-star' : value >=4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
           <span>
               {text && text}
           </span>
        </div>
    )
}


// So by default we want there to be a color prop, if we like we can then change the props for this

Rating.defaultProps = {
    color: '#f8e825'
}

// this is useful as if there is an issue we will be alerted more clearly to where the issue is occuring
Rating.propTypes ={
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    // as we have a default color, we do not need to set it to required
    color: PropTypes.string
}

export default Rating
