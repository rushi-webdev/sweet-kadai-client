// SVGComponent.js

import React from 'react';

const SVGComponent = () => {
  const pathStyle = {
    stroke: 'none',
    fillRule: 'nonzero',
    fill: 'rgb(43.137255%,27.45098%,0%)',
    fillOpacity: 1,
  };

  return (
    <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='12pt' height='12pt' viewBox='0 0 12 12' version='1.1'>
      <g id='surface1'>
        <path style={pathStyle} d='M 10.953125 4.679688 L 11.828125 6 L 10.953125 7.320312 L 11.039062 8.902344 L 9.632812 9.613281 L 8.921875 11.023438 L 7.339844 10.9375 L 6.019531 11.808594 L 4.699219 10.9375 L 3.117188 11.023438 L 2.40625 9.613281 L 1 8.902344 L 1.085938 7.320312 L 0.210938 6 L 1.085938 4.679688 L 1 3.097656 L 2.40625 2.386719 L 3.117188 0.980469 L 4.699219 1.066406 L 6.019531 0.195312 L 7.339844 1.066406 L 8.921875 0.980469 L 9.632812 2.386719 L 11.039062 3.097656 Z M 9.539062 6 C 9.539062 4.054688 7.964844 2.480469 6.019531 2.480469 C 4.074219 2.480469 2.5 4.054688 2.5 6 C 2.5 7.945312 4.074219 9.523438 6.019531 9.523438 C 7.964844 9.523438 9.539062 7.945312 9.539062 6 Z M 9.539062 6   '/>
        <path style={pathStyle} d='M 9.539062 6 C 9.539062 7.945312 7.964844 9.523438 6.019531 9.523438 C 4.074219 9.523438 2.5 7.945312 2.5 6 C 2.5 4.054688 4.074219 2.480469 6.019531 2.480469 C 7.964844 2.480469 9.539062 4.054688 9.539062 6 Z M 9.539062 6 '/>
        <path style={pathStyle} d='M 7.371094 4.875 L 5.550781 6.59375 L 4.675781 5.695312 C 4.578125 5.59375 4.417969 5.59375 4.320312 5.691406 C 4.21875 5.785156 4.21875 5.945312 4.3125 6.046875 L 5.363281 7.121094 C 5.460938 7.21875 5.617188 7.222656 5.71875 7.128906 L 7.722656 5.238281 C 7.769531 5.191406 7.800781 5.128906 7.800781 5.0625 C 7.800781 4.996094 7.777344 4.929688 7.730469 4.882812 C 7.632812 4.78125 7.472656 4.777344 7.371094 4.875 Z M 7.371094 4.875  '/>
        <path style={pathStyle} d='M 6.019531 2.226562 C 3.9375 2.226562 2.246094 3.917969 2.246094 6 C 2.246094 8.082031 3.9375 9.773438 6.019531 9.773438 C 8.101562 9.773438 9.792969 8.082031 9.792969 6 C 9.792969 3.917969 8.101562 2.226562 6.019531 2.226562 Z M 6.019531 9.269531 C 4.214844 9.269531 2.75 7.800781 2.75 6 C 2.75 4.199219 4.214844 2.730469 6.019531 2.730469 C 7.824219 2.730469 9.289062 4.195312 9.289062 6 C 9.289062 7.804688 7.824219 9.269531 6.019531 9.269531 Z M 6.019531 9.269531'/>
        <path style={pathStyle} d='M 11.210938 4.613281 L 11.296875 3.113281 C 11.300781 3.011719 11.246094 2.917969 11.15625 2.875 L 9.824219 2.199219 L 9.148438 0.867188 C 9.101562 0.777344 9.007812 0.722656 8.910156 0.726562 L 7.410156 0.808594 L 6.160156 -0.0195312 C 6.074219 -0.0742188 5.964844 -0.0742188 5.878906 -0.0195312 L 4.628906 0.808594 L 3.132812 0.722656 C 3.03125 0.71875 2.9375 0.773438 2.890625 0.863281 L 2.21875 2.195312 L 0.882812 2.871094 C 0.796875 2.917969 0.742188 3.011719 0.746094 3.109375 L 0.828125 4.609375 L 0.00390625 5.859375 C -0.0507812 5.945312 -0.0507812 6.050781 0.00390625 6.136719 L 0.828125 7.390625 L 0.742188 8.886719 C 0.738281 8.988281 0.792969 9.082031 0.882812 9.128906 L 2.214844 9.800781 L 2.890625 11.136719 C 2.9375 11.226562 3.03125 11.277344 3.128906 11.273438 L 4.628906 11.191406 L 5.878906 12.015625 C 5.960938 12.074219 6.070312 12.074219 6.15625 12.015625 L 7.40625 11.191406 L 8.902344 11.273438 C 9.003906 11.28125 9.097656 11.226562 9.144531 11.136719 L 9.816406 9.800781 L 11.152344 9.128906 C 11.242188 9.082031 11.296875 8.988281 11.289062 8.886719 L 11.207031 7.390625 L 12.035156 6.140625 C 12.089844 6.054688 12.089844 5.945312 12.035156 5.863281 Z M 10.742188 7.183594 C 10.710938 7.226562 10.699219 7.28125 10.703125 7.335938 L 10.78125 8.753906 L 9.519531 9.390625 C 9.472656 9.414062 9.433594 9.453125 9.410156 9.5 L 8.773438 10.761719 L 7.355469 10.683594 C 7.300781 10.679688 7.246094 10.695312 7.203125 10.722656 L 6.019531 11.503906 L 4.835938 10.722656 C 4.796875 10.695312 4.746094 10.679688 4.699219 10.679688 L 4.6875 10.679688 L 3.269531 10.757812 L 2.632812 9.5 C 2.609375 9.449219 2.570312 9.410156 2.519531 9.386719 L 1.257812 8.753906 L 1.335938 7.335938 C 1.339844 7.28125 1.324219 7.230469 1.296875 7.183594 L 0.515625 6 L 1.296875 4.820312 C 1.328125 4.773438 1.339844 4.71875 1.335938 4.664062 L 1.257812 3.246094 L 2.519531 2.609375 C 2.566406 2.585938 2.605469 2.546875 2.628906 2.5 L 3.265625 1.238281 L 4.683594 1.316406 C 4.738281 1.320312 4.789062 1.304688 4.835938 1.277344 L 6.019531 0.496094 L 7.203125 1.277344 C 7.246094 1.308594 7.300781 1.324219 7.355469 1.316406 L 8.773438 1.238281 L 9.410156 2.5 C 9.433594 2.546875 9.472656 2.585938 9.519531 2.609375 L 10.78125 3.246094 L 10.703125 4.664062 C 10.699219 4.71875 10.714844 4.773438 10.742188 4.820312 L 11.519531 6 Z M 10.742188 7.183594'/>
      </g>
    </svg>
  );
};

export default SVGComponent;