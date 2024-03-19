import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NavBar() {
    /**
  * Hook useRouter proporciona el acceso al router de Next.js.
  */
    const router = useRouter();

    /**
     * Estado que almacena el elemento ancla del menú.
     */
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    /**
     * Maneja la acción de salida del usuario.
     * Elimina los datos de usuario almacenados en el localStorage y redirige al usuario a la página de inicio.
     */
    const handleExit = () => {
        localStorage.removeItem("userData")
        router.push("/")
    }

    /**
     * Maneja la apertura del menú.
     * @param event El evento de clic del mouse que desencadenó la apertura del menú.
     */
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * Maneja el cierre del menú.
     */
    const handleClose = () => {
        setAnchorEl(null);
    };



    return (<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Lista de Inscripciones
                </Typography>

                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleExit}>Salir</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    </Box>
    );
}