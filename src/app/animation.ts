import { trigger, transition, style, animate, state, query, stagger, keyframes } from '@angular/animations';
  
export let albumAnimationTransition = 
    transition('void =>*', [

        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('300ms', [
            animate('1s {{timing1}} ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(175px)', offset: 0}),
            style({opacity: 0.75, transform: 'translateY(-10px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
            ]))
        ]))
    ]);

export let fadeIn = 
    transition('void =>*', [

        query(':enter', style({opacity:1}), {optional:true}),
            animate('2s {{timing1}} ease-in', keyframes([
            style({opacity: 0}),
            // style({opacity: 0.75}),
            style({opacity: 1})
            ]))
    
]);


export let dropDownStagger = 
    trigger('dropDown', [

        transition('void =>*', [

        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('300ms', [
            animate('2s ease-in', keyframes([
                style({opacity: 0, transform: 'translateY(175px)', offset: 0}),
                style({opacity: 0.75, transform: 'translateY(-10px)', offset: 0.3}),
                style({opacity: 1, transform: 'translateY(0)', offset: 1})
            ]))
        ]))
    ])
]);



export let dropDown = 
    trigger('dropDown', [

        transition('void =>*', [

        query(':enter', style({ opacity: 0 }), {optional: true}),
            animate('.7s cubic-bezier(.51,.88,.62,.78)', keyframes([
            style({opacity: 0, transform: 'translateY(-2em)', offset: 0}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
            ]))
    ])
]);



export let fade = 
    trigger('fade', [

        transition('void =>*', [

        query(':enter', style({ opacity: 0 }), {optional: true}),
            animate('1.8s 0s cubic-bezier(.78,.46,.67,.81)', keyframes([
            style({opacity: 0 }),
            style({opacity: 0.1 }),
            style({opacity: 0.75 }),
            style({opacity: 1 })
            ]))
    ])
]);


export let textFade = 
    trigger('textFade', [

        transition('void =>*', [

        query(':enter', style({ opacity: 0 }), {optional: true}),
            animate('.8s 0s ease-in', keyframes([
            style({opacity: 0 }),
            style({opacity: 0.1 }),
            style({opacity: 0.75 }),
            style({opacity: 1 })
            ]))
    ])
]);


export let slideRight = 
    trigger('slideRight', [

        transition('void =>*', [

        query(':enter', style({ opacity: 0 }), {optional: true}),
            animate('.8s ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(-175px)', offset: 0}),
            style({opacity: 0.5, transform: 'translateX(5px)', offset: 0.5}),
            style({opacity: 1, transform: 'translateX(0)', offset: 1})
            ]))
    ])
]);

export let slideLeft = 
    trigger('slideLeft', [

        transition('void =>*', [

        query(':enter', style({ opacity: 0 }), {optional: true}),
            animate('.8s ease-in', keyframes([
            style({opacity: 0, transform: 'translateX(175px)', offset: 0}),
            style({opacity: 0.5, transform: 'translateX(-5px)', offset: 0.5}),
            style({opacity: 1, transform: 'translateX(0)', offset: 1})
            ]))
    ])
]);
    

