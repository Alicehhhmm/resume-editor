import {
    defaultShouldDehydrateQuery,
    QueryClient,
} from '@tanstack/react-query';
import superjson from 'superjson';

/**
 * 创建并配置一个React Query的QueryClient实例
 * 
 * 特点说明：
 * 1. 数据保鲜策略：默认查询数据在30秒内视为最新（不自动重新请求）
 * 2. 序列化增强：使用superjson处理复杂数据类型（如Date/Map/Set等）
 * 3. hydrate增强：包含pending状态的查询以保证服务端渲染数据完整性
 * 4. 水合支持：客户端能正确解析服务端传来的增强序列化数据
 */
export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30 * 1000,
            },
            // 服务端到客户端的数据传递配置
            dehydrate: {
                // 使用superjson序列化：
                // - 支持JS特殊数据类型（Date/Map/Set等）
                // - 保持数据类型完整性
                serializeData: superjson.serialize,

                // hydrate条件增强逻辑：
                // 1. 包含默认应hydrate的查询（数据未过期/需要缓存）
                // 2. 特别包含pending状态的查询（避免SSR渲染时客户端重新请求）
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
            // 客户端数据解析配置
            // 使用superjson反序列化：
            // 还原服务端序列化的特殊数据类型
            hydrate: {
                deserializeData: superjson.deserialize,
            },
        },
    });
}

