import * as React from 'react';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../../stylesheets/Badge.css';

export default function BadgeMax(props) {
  return (
      <div className='badge'>
        <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
          <Badge color="primary" badgeContent={ props.danger === 0 ? "0" : props.danger } max={ 99999 }>
            <ReportIcon color={ props.danger === 0 ? "default" : "error" } />
          </Badge>
          <Badge color="primary" badgeContent={ props.warning === 0 ? "0" : props.warning } max={ 99999 }>
            <WarningIcon color={ props.warning === 0 ? "default" : "warning" }/>
          </Badge>
          <Badge color="primary" badgeContent={ props.info === 0 ? "0": props.info } max={ 99999 }>
            <InfoIcon color={props.info === 0 ? "default" : "info"} />
          </Badge>
          <Badge color="primary" badgeContent={ props.safe === 0 ? '0': props.safe } max={ 99999 }>
            <CheckCircleIcon color={ props.safe === 0 ? "default" : "success" }/>
          </Badge>
        </Stack>
      </div>
  );
}