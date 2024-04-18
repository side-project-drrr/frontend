import { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
        <section>
            <div>
                <p>이용에 불편을 드려 죄송합니다.</p>
                <p>동일한 현상이 계속될 경우 문의 주시기 바랍니다.</p>
                <button onClick={resetErrorBoundary}>다시 시도하기</button>
                <pre style={{ color: 'red' }}>{error.message}</pre>
            </div>
        </section>
    );
};
