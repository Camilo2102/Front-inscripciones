"use client"
import { useInscriptions } from '@/services/mainService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from '@/components/NavBar';

export default function MainPage() {
    /**
 * Hook de estado para manejar la lista de inscripciones.
 */
    const [inscriptions, setInscriptions] = useState([] as any);

    const [userId, setUserId] = useState(-1);

    /**
     * Custom hook para acceder a las funciones relacionadas con las inscripciones.
     */
    const { getInscriptions, createInscription, deleteInscription } = useInscriptions();

    /**
     * Carga las inscripciones al montar el componente.
     */
    useEffect(() => {
        const id = JSON.parse(localStorage.getItem("userData") || "{}").id;
        setUserId(id);
        loadData();
    }, [])

    /**
     * Carga las inscripciones utilizando la función getInscriptions y actualiza el estado con los datos obtenidos.
     */
    const loadData = () => {
        getInscriptions().then(res => {
            console.log(res.data.data);
            setInscriptions(res.data.data)
        })
    }

    /**
     * Maneja la acción de inscripción a un evento específico.
     * @param eventId El ID del evento al que se desea inscribir.
     */
    const handleInscription = (eventId: any) => {
        createInscription(eventId, userId).then(res => loadData())
    }

    /**
     * Maneja la acción de cancelar la inscripción a un evento específico.
     * @param eventId El ID del evento al que se desea cancelar la inscripción.
     */
    const handleDeleteInscription = (eventId: any) => {
        deleteInscription(eventId, userId).then(res => loadData())
    }

    /**
     * Valida el estado de la inscripción del usuario actual para un evento específico.
     * @param assistants La lista de asistentes al evento.
     * @returns Un elemento Chip que indica si el usuario ya está inscrito o si la inscripción está disponible.
     */
    const validateStatus = (assistants: any[]) => {
        const user = assistants.find((assistant: any) => assistant.userId === userId);
        return (user ? <Chip label="Ya inscrito" color='error' /> : <Chip label="Disponible" color='success' />)
    }

    /**
     * Valida y renderiza un botón de inscripción o anulación para un evento específico dependiendo del estado de la inscripción del usuario actual.
     * @param inscription La información de la inscripción.
     * @param assistants La lista de asistentes al evento.
     * @returns Un botón de inscripción o anulación dependiendo del estado de la inscripción del usuario actual.
     */
    const validateButton = (inscription: any, assistants: any[]) => {
        const user = assistants.find((assistant: any) => assistant.userId === userId);
        return (user ? <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteInscription(inscription.event.id)}> Anular</Button>
            : <Button variant="outlined" color="success" startIcon={<CheckIcon />} onClick={() => handleInscription(inscription.event.id)}> Inscribir</Button>
        )
    }

    return (
        <>
            <NavBar></NavBar>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "40px" }}>
                <TableContainer component={Paper}>
                    <Table aria-label="eventos table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre del Evento</TableCell>
                                <TableCell>Descripcion del Evento</TableCell>
                                <TableCell>Lugar</TableCell>
                                <TableCell>Total de cupos</TableCell>
                                <TableCell>Cupos restantes</TableCell>
                                <TableCell>Inscrito</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inscriptions.map((inscription: any) => (
                                <TableRow key={inscription.event.id}>
                                    <TableCell component="th" scope="row">
                                        {inscription.event.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {inscription.event.description}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {inscription.event.location}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {inscription.totalQuotas}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {inscription.totalQuotas - inscription.actualQuotas}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {validateStatus(inscription.assistants)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {validateButton(inscription, inscription.assistants)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>

    )
}