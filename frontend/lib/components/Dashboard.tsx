import React from 'react';

import Loader from '@lib/components/Loader';
import { useUserController } from '@lib/user-state';
import { Redirect } from 'react-router-dom';
import Title from './Title';
import { Barrios } from '@lib/payloads';
import names from '@lib/names.json';
import {
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { getBarrios } from '@lib/api';

const getDeptos = (provincia?: string) => {
  const p = provincia && names.provincias.find((v) => v.id === provincia);
  return p ? p.deptos : names.provincias.flatMap((v) => v.deptos);
};

const getLocalidades = (provincia?: string, depto?: string) => {
  if (depto) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    provincia = provincia!;
    const l = getDeptos(provincia).find((v) => v.id === depto);
    return l?.localidades ?? [];
  } else if (provincia) {
    const l = getDeptos(provincia).flatMap((v) => v.localidades);
    return l;
  }
  return names.provincias.flatMap((v) =>
    v.deptos.flatMap((v) => v.localidades)
  );
};

const Dashboard: React.FC = () => {
  const controller = useUserController();

  const [provincia, setProvincia] = React.useState<string | undefined>();
  const [depto, setDepto] = React.useState<string | undefined>();
  const [localidad, setLocalidad] = React.useState<string | undefined>();
  const [barrios, setBarrios] = React.useState<Barrios[] | undefined>(/*[
    {
      id_renabap: '1',
      nombre_barrio: 'Monterrey I',
      cod_provincia: '06',
      provincia: 'Buenos Aires',
      cod_depto: '06638',
      departamento: 'Pilar',
      localidad: 'Presidente Derqui',
      año_creacion: '1990',
      acceso_electricidad: 'Conexión irregular a la red pública',
      acceso_cloaca: 'Desagüe sólo a pozo negro/ciego u hoyo',
      acceso_agua: 'Conexión irregular a la red pública de agua corriente',
      cantidad_familias_estimado: '40',
      geometry: '"MULTIPOLYGON (((-58.83350090114561 -34.48127677071819',
    },
    {
      id_renabap: '2',
      nombre_barrio: 'Malvinas II',
      cod_provincia: '06',
      provincia: 'Buenos Aires',
      cod_depto: '06441',
      departamento: 'La Plata',
      localidad: 'José Melchor Romero',
      año_creacion: '1997',
      acceso_electricidad: 'Conexión irregular a la red pública',
      acceso_cloaca: 'Desagüe a cámara séptica y pozo ciego',
      acceso_agua: 'Conexión irregular a la red pública de agua corriente',
      cantidad_familias_estimado: '273',
      geometry: '"MULTIPOLYGON (((-58.01200048352921 -34.94731966989249',
    },
    {
      id_renabap: '3',
      nombre_barrio: 'Ferroviario',
      cod_provincia: '06',
      provincia: 'Buenos Aires',
      cod_depto: '06441',
      departamento: 'La Plata',
      localidad: 'Angel Etcheverry',
      año_creacion: '2003',
      acceso_electricidad: 'Conexión irregular a la red pública',
      acceso_cloaca: 'Desagüe sólo a pozo negro/ciego u hoyo',
      acceso_agua: 'Conexión formal al agua corriente de red pública',
      cantidad_familias_estimado: '133',
      geometry: '"MULTIPOLYGON (((-58.07980353023293 -35.03507376288676',
    },
  ] as any*/);

  React.useEffect(() => {
    if (controller.current === undefined) return;
    void getBarrios(provincia, depto, localidad).then((v) =>
      setBarrios(v ?? [])
    );
  }, [controller.current, provincia, depto, localidad]);

  if (controller.current === undefined) return <Loader />;
  else if (controller.current === null) return <Redirect to="/logIn" />;

  return (
    <>
      <Title>Dashboard</Title>
      <Container>
        <Stack direction="row">
          <FormControl fullWidth>
            <InputLabel id="prov-sel">Provincia</InputLabel>
            <Select
              labelId="prov-sel"
              id="prov"
              value={provincia}
              label="Provincia"
              onChange={(v) => setProvincia(v.target.value)}
            >
              {names.provincias.map((v) => {
                return (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="depto-sel">Departamento</InputLabel>
            <Select
              labelId="depto-sel"
              id="depto"
              value={depto}
              label="Departamento"
              onChange={(v) => setDepto(v.target.value)}
            >
              {getDeptos(provincia).map((v) => {
                return (
                  <MenuItem key={String(v?.id)} value={String(v?.id)}>
                    {String(v?.name)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="loc-sel">Localidad</InputLabel>
            <Select
              labelId="loc-sel"
              id="loc"
              value={localidad}
              label="Localidad"
              disabled={!depto}
              onChange={(v) => setLocalidad(v.target.value)}
            >
              {getLocalidades(provincia, depto).map((v) => {
                return (
                  <MenuItem key={String(v)} value={String(v)}>
                    {String(v)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Familias</TableCell>
                <TableCell>Paquetes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {barrios?.map((v) => (
                <TableRow key={v.id_renabap}>
                  <TableCell>
                    <Link component={RouterLink} to={`/barrio/${v.id_renabap}`}>
                      {v.nombre_barrio}
                    </Link>
                  </TableCell>
                  <TableCell>{v.cantidad_familias_estimado}</TableCell>
                  <TableCell>{v.paquetes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
