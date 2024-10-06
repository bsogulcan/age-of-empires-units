import {TestBed} from '@angular/core/testing';

import {UnitService} from './unit.service';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";

describe('UnitService', () => {
    let service: UnitService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(withInterceptorsFromDi())]
        });
        service = TestBed.inject(UnitService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
