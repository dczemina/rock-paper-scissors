/**
 * Show an element in the DOM after a specified time period
 * @param {*} element a DOM element
 * @param {*} delay amount of time to delay
 */
const hideAfterDelay = (element, delay) => {
    element.classList.add('opacity-transition')
    element.classList.add('translucent');
    setTimeout(() => {
        element.classList.add('remove');
    }, delay);
}

/**
 * Hide an element in the DOM after a specified time period
 * @param {*} element a DOM element
 * @param {*} delay amount of time to delay
 */
const showAfterDelay = (element, delay) => {
    element.classList.add('opacity-transition')
    element.classList.remove('remove');
    setTimeout(() => {
        element.classList.remove('translucent');
    }, delay);
}

/**
 * Remove an element from the DOM after a specified time period
 * @param {*} element a DOM element
 * @param {*} delay amount of time to delay
 */
const removeAfterDelay = (element, delay) => {
    element.classList.add('opacity-transition')
    setTimeout(() => {
        element.classList.toggle('translucent')
        setTimeout(() => {
            element.remove();
        }, 500) // duration of animation
    }, delay )
}

/**
 * Remove a css class from an element after a delay
 * @param {*} element a DOM element
 * @param {*} clazz css class to remove
 * @param {*} delay amount of time to delay
 */
const removeClassAfterDelay = (element, clazz, delay) => {
    setTimeout(() => {
        element.classList.remove(clazz);
    }, delay);
}