# Simple Multipurpose Carousel
`<Carousel slidesArray={[]} settings={{}} onResize=()=>{} />`

## How to use it?
Usable component is in src/Carousel. Containing component should have width.

The component accepts an array of elements in props.
Prop name is slidesArray

`<Carousel slidesArray=[<div>...</div>,<div>...</div>,<img src="example.jpg">]/>`

The component also accepts an object with settings 

## Default settings:

- height = "600px"(string) -- Height of the component
- arrow = true(boolean) -- Showing Navigation arrow
- dots = true(boolean) -- Showing Navigation dots on the bottom(on click its jumping to the item)
- backgroundColor = ""(string)
- transitionType = "linear"(string) -- Animation type accepts CSS animation timing function values : ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier(n,n,n,n)
- animationLength = 300(number) -- Length of the animation, Animation delay in milliseconds
- scrollingBackSpeed = 2000(number) -- Length of going back animation from the end, Animation delay in milliseconds.**!!Need to be shorter than autoplaySpeed!!**
- arrowColor = "black"(string) -- Color of the navigation arrow, can be # hex value or rgba(0, 0, 255, 0.3) or colorname, CSS color property 
- autoplay = false(boolean) -- Automatically moving slides
- autoplaySpeed = 3000(number) -- During autoplay delay between changing slides
- neverend = false(boolean) -- End of the slides it can roll back to the first slide, **!!during autoplay it is turned on automatically!!**
- slidesShown = 1(number) -- How many slides should be visible at once

To be able to serve correct size of images for phones and monitors there is also an onResize prop which is a callBack on Size change, Returning an object with width and height
`{ width: , height: }`