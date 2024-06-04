import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { useSetRecoilState } from 'recoil';
import { DisplayModeState } from '../../recoil/atom/DisplayModeState';
import { memo } from 'react';

function DisplayModeSwitch() {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const setDisplayMode = useSetRecoilState(DisplayModeState);

    return (
        <div className="flex justify-end pr-4">
            <FormGroup>
                <Switch
                    {...label}
                    defaultChecked
                    onChange={e => setDisplayMode(e.target.checked)}
                    aria-label="DisplayMode Switch"
                />
            </FormGroup>
        </div>
    );
}

export default memo(DisplayModeSwitch);
