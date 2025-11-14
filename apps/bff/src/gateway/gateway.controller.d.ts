import { GatewayService } from './gateway.service';
export declare class GatewayController {
    private readonly gatewayService;
    constructor(gatewayService: GatewayService);
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
//# sourceMappingURL=gateway.controller.d.ts.map