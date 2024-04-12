## Test unitaire

Les test unitaires consiste à tester un élément de petite taille dans notre code. (ex: une fonction, une class)
Si l'élément testé utilise des dépendances, il est de mise d'utiliser un mock.
Ce mock nous permettra de controller le comportement de l'élément testé en fonction du comportement piloté par nos soins de ses dépendances.

Les tests unitaires sont extrément utile pour simplifier le processus de dévellopement.

Les tests unitaires sont lancé via la commande: `npm run test`

### Test unitaire d'un service sous nest

Lors de la création d'un service via la `cli` un fichier de test est automatiquement généré.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  sum(a: number, b: number): number {
    return a + b;
  }
}
```

```ts 
import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;
  
  // Fonction à éxecuter avant chaque test => nous aurons toujours une instance fraiche à testé
  beforeEach(async () => {
    // Création d'un module minimal de test avec les dépendances requise pour le bon fonctionnement du service
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();
    
    // Récupére le service dans le module
    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('sum 2 numbers', () => {
    expect(service.sum(1, 2)).toEqual(3);
  })
});
```

### Test unitaire d'un controlleur avec un mock sur le service

```ts
import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller()
export class CalculatorController {
  constructor(
    private readonly calculatorService: CalculatorService,
  ) {}

  @Get('sum')
  getSum(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ) {
    return this.calculatorService.sum(a, b);
  }
}
```


```ts
import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';

describe('CalculatorController', () => {
  let controller: CalculatorController;
  const calculatorServiceMock = {
    // jest.fn() offre une fonction générique pilotable avec un certain nombre de méthode de test
    // https://jestjs.io/docs/jest-object#jestfnimplementation
    sum: jest.fn().mockReturnValue(0)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        // Fournis le mock au module pour qu'il l'injecte lorsque le CalculatorService sera demandé
        {
          provide: CalculatorService,
          useValue: calculatorServiceMock,
        }
      ],
      controllers: [CalculatorController],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('get sum', () => {
    controller.getSum(1, 2);
    // Vérifie que notre mock à bien été utilisé par le controlleur
    expect(calculatorServiceMock.sum).toHaveBeenCalled();
    
  })
});
```
