import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class GatewayService {
    private httpService;
    private configService;
    private readonly apiUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    getTodos(): Promise<any>;
    getTodoById(id: string): Promise<any>;
    getAggregatedData(): Promise<{
        todos: any;
        meta: {
            aggregatedAt: string;
            source: string;
        };
    }>;
}
//# sourceMappingURL=gateway.service.d.ts.map