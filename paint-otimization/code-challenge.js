(function (window, document, $) {
    'use strict';
    function app() {

        const $visor = document.querySelector('[data-js="visor"]');
        const arrayBase = [1, 2, 3, 4];
        const visors = arrayBase.map((x) => document.querySelector('[data-js="visor-0' + x + '"]')); 
        const widths = arrayBase.map((x) => document.querySelector('[data-js="width-wall-0' + x + '"]')); 
        const heights = arrayBase.map((x) => document.querySelector('[data-js="height-wall-0' + x + '"]')); 
        const doors = arrayBase.map((x) => document.querySelector('[data-js="door-wall-0' + x + '"]')); 
        
        const $windows = document.querySelector('[data-js="windows"]');

        const $buttonCalculateArea = document.querySelector('[data-js="button-calculate-area"]');

        $buttonCalculateArea.addEventListener('click', handleClickCalculateArea, false);

        function decreaseArea() {
            
            const arrayDoorArea = [];

            [0, 1, 2, 3].map((x) => {
                const doorArea = doors[x].value.replace(/\D+/g, '') * (0.8 * 1.9);
                arrayDoorArea.push(doorArea);
            });
        
            function windowsArea() {
                const windowsAreaValue = $windows.value.replace(/\D+/g, '') * (1.2 * 2);
                return windowsAreaValue;
            }
            
            const totalDoorArea = [0, 1, 2, 3].reduce((acc, x) => {
                const value = arrayDoorArea[x];
                return acc + value;
            }, 0);

            const doorsAndWindows = totalDoorArea + windowsArea();

            return doorsAndWindows;
        }
        
        function calculateWallArea() {

            const arrayArea = [];

            [0, 1, 2, 3].map((x) => {
                const area = widths[x].value.replace(/\D+/g, '') * heights[x].value.replace(/\D+/g, '');
                arrayArea.push(area);
            });

            const totalArea = [0, 1, 2, 3].reduce((acc, x) => {
                const value = arrayArea[x];
                return acc + value;
            }, 0);

            return totalArea;
        }

        function confirmConditions() {

            for (let i = 0; i < 4; i++){
                if ((doors[i].value.replace(/\D+/g, '') >= 1) && (heights[i].value.replace(/\D+/g, '') < 2.2)){
                alert('A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta');
                $visor.value = 0;
                return;
                }
            }

            for (let i = 0; i < 4; i++){
                if ((((widths[i].value.replace(/\D+/g, ''))*(heights[i].value.replace(/\D+/g, ''))) < 1) || (((widths[i].value.replace(/\D+/g, ''))*(heights[i].value.replace(/\D+/g, ''))) > 15)){
                alert('Nenhuma parede pode ter menos de 1 metro quadrado nem mais de 15 metros quadrados'); 
                $visor.value = 0;
                return;
                }
            }

        }

        function finalAreas() {

            if(calculateWallArea() / decreaseArea() < 2)
            return alert('O total de área das portas e janelas deve ser no máximo 50% da área de parede'), $visor.value = 0;

        }

        function result() {

            return calculateWallArea() - decreaseArea();

        }

        function bestOptimizationPaint() {

            const results = result();
            
            if($visor.value < 1) {
                visors[0].value = 0;
                visors[1].value = 0;
                visors[2].value = 0;
                visors[3].value = 0;
                return;
            }

            if(results < 12.5) return visors[0].value = Math.ceil(result() / 2.5);

            if(results === 12.5) return visors[1].value = 1;

            if(results > 12.5 && results < 18) {
                visors[1].value = 1;
                visors[0].value = Math.ceil((results - 12.5) / 2.5);
                return;
            }

            if(results === 18) return visors[2].value = 1;

            if(results > 18 && results < 20) {
                visors[2].value = 1;
                visors[0].value = Math.ceil((results - 18) / 2.5);
                return;
            }

            if(results > 20 && results <= 30.5) {
                visors[2].value = 1;
                visors[1].value = 1;
            }

            if(results > 30.5 && results < 36) return visors[2].value = 2; 

            if(results === 36) return $visor[2].value = 2;

            if(results > 36 && results <= 38) {
                visors[2].value = 2;
                visors[0].value = Math.ceil((results - 36) / 2.5);
                return;
            }
            
            if(results > 38 && results <= 48.5) {
                visors[2].value = 2;
                visors[1].value = 1;
                return;
            } 

            if(results > 48.5 && results < 54) {
                visors[2].value = 2;
                visors[1].value = 1;
                visors[0].value = Math.ceil((results - 48.5) / 2.5);
                return;
            }

            if(results === 54) return visors[2].value = 3;

            if(results > 54 && results <= 60) return visors[3].value = 1;

            if (results > 60) {
                visors[0].value = 0;
                visors[1].value = 0;
                visors[2].value = 0;
                visors[3].value = 0;
                return;
            }

        }

        function handleClickCalculateArea() {

            confirmConditions();
            finalAreas();
            $visor.value = result();
            bestOptimizationPaint();
            
        }
        
    };

    app();

})(window, document, window.DOM);