// hooks/use-intersection-observer.ts
import { useState, useEffect, useRef } from 'react'

/**
 * 视口交叉观察 Hook，用于检测元素是否进入可视区域
 * 
 * @param {IntersectionObserverInit} [options] - IntersectionObserver 配置项
 * @param {number | number[]} [options.threshold=0] - 触发回调的可见度阈值
 * @param {string} [options.rootMargin='0px'] - 预加载边距（格式同 CSS margin）
 * @param {Element | Document} [options.root=null] - 观察根元素
 * 
 * @returns {
 *  targetRef: React.RefObject<HTMLDivElement>, // 绑定到目标元素的 ref
 *  isIntersecting: boolean // 当前是否与视口交叉
 * }
 * 
 * @example  基本用法
 * const { targetRef, isIntersecting } = useIntersectionObserver({
 *   threshold: 0.5,
 *   rootMargin: '100px 0 0 0' // 视口边界值
 * })
 */
export const useIntersectionObserver = (options?: IntersectionObserverInit) => {
    const [isIntersecting, setIsIntersecting] = useState(false)
    const targetRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = targetRef.current
        if (!element) return

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry?.isIntersecting ?? false)
        }, options)

        observer.observe(element)

        return () => {
            observer.unobserve(element)
            observer.disconnect()
        }
    }, [options])

    return { targetRef, isIntersecting }
}