import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { useSetRecoilState } from 'recoil';
import { DisplayModeState } from '../../recoil/atom/DisplayModeState';

export default function DisplayModeSwitch() {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const setDisplayMode = useSetRecoilState(DisplayModeState);

    return (
        <div className="flex justify-end w-full">
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
