/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Button, PressEvent } from 'react-aria-components';

import ProgressCircle from '@/components/ProgressCircle/ProgressCircle';

export default function PendingButton({
    children,
    onPress: originalOnPress,
    ...rest
}: any) {
    const [isPending, setPending] = useState(false);

    function onPress(_: PressEvent) {
        setPending(true);
        originalOnPress();
        setPending(false);
    }

    return (
        <Button {...rest} isPending={isPending} onPress={onPress}>
            {({ isPending }) => (
                <>
                    {!isPending && <span>{children}</span>}
                    {isPending && (
                        <ProgressCircle
                            aria-label="Pending..."
                            isIndeterminate
                        />
                    )}
                </>
            )}
        </Button>
    );
}
