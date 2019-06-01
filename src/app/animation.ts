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
    


  /*
  
  trigger('fadeIn', [

      state('for', style({
    }), {params: {timing1: '1.2s'}}), // default parameters values required
      transition('void =>*', [

      query(':enter', style({ opacity: 0 }), {optional: true}),
      query(':enter', stagger('300ms', [
          animate('{{timing1}} 1.2s ease-in', keyframes([
          style({opacity: 0, transform: 'translateY(175px)', offset: 0}),
          style({opacity: 0.75, transform: 'translateY(-10px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
      ]))
      ])
  ])

  */



 //  !! Saftey
     /*    export let albumSlideFadeIn = trigger('fadeIn', [
     
             transition('void =>*', [
     
             query(':enter', style({ opacity: 0 }), {optional: true}),
             query(':enter', stagger('300ms', [
                 animate('1s 1.2s ease-in', keyframes([
                 style({opacity: 0, transform: 'translateY(175px)', offset: 0}),
                 style({opacity: 0.75, transform: 'translateY(-10px)', offset: 0.3}),
                 style({opacity: 1, transform: 'translateY(0)', offset: 1})
                 ]))
             ]))
             ])
         ]);
  
*/

