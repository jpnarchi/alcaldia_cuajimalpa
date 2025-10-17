import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip,
  Alert,
  Snackbar,
  Grid,
} from '@mui/material';
import { Description, Download, CalendarToday, Person } from '@mui/icons-material';

export const GenerateReport: React.FC = () => {
  const [formData, setFormData] = useState({
    // Información básica
    day: '',
    date: '',
    time: '',
    shift: '',
    staffName: '',
    activationMode: '',
    serviceType: '',
    
    // Información de atención
    attentionDate: '',
    attentionTime: '',
    travelTime: '',
    location: '',
    gpsCoordinates: '',
    severity: '',
    kilometersTraveled: '',
    
    // Trabajos y observaciones
    workPerformed: '',
    observations: '',
    photos: [] as File[],
    conclusion: '',
    
    // Responsables
    responsiblePerson: '',
    responsibleArea: '',
    participatingAuthorities: '',
    
    // Formato
    reportFormat: 'pdf'
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const shifts = [
    'Matutino (6:00 - 14:00)',
    'Vespertino (14:00 - 22:00)',
    'Nocturno (22:00 - 6:00)',
  ];

  const activationModes = [
    'Llamada de emergencia',
    'Seguimiento de oficio',
  ];

  const serviceTypes = [
    'Petición de mitigación de riesgo',
    'Emergencia estructural',
    'Emergencia eléctrica',
    'Emergencia de gas',
    'Inundación',
    'Incendio',
    'Derrumbe',
    'Otro',
  ];

  const severityLevels = [
    'Baja',
    'Media',
    'Alta',
    'Crítica',
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      photos: prev.photos.filter((_, i) => i !== index) 
    }));
  };

  const handleGenerateReport = async () => {
    // Validar campos obligatorios
    const requiredFields = [
      'day', 'date', 'time', 'shift', 'staffName', 'activationMode', 
      'serviceType', 'attentionDate', 'attentionTime', 'travelTime', 
      'location', 'severity', 'kilometersTraveled', 'workPerformed', 
      'observations', 'conclusion', 'responsiblePerson', 'responsibleArea'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Por favor completa todos los campos obligatorios. Faltan: ${missingFields.join(', ')}`);
      return;
    }
    
    setIsGenerating(true);
    
    // Simular generación de reporte
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Generar Reporte
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Reporte de Emergencia
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Complete todos los campos obligatorios para generar el reporte
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {/* Información Básica */}
                <Grid size={{ xs: 12 }}>
                  <Paper sx={{ p: 3, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      📋 Información Básica
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Datos generales del reporte y personal involucrado
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          fullWidth
                          label="Día"
                          value={formData.day}
                          onChange={(e) => handleInputChange('day', e.target.value)}
                          placeholder="Ej: Lunes, Martes, etc."
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          fullWidth
                          label="Fecha"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange('date', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          fullWidth
                          label="Hora"
                          type="time"
                          value={formData.time}
                          onChange={(e) => handleInputChange('time', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth required variant="outlined">
                          <InputLabel>Turno</InputLabel>
                          <Select
                            value={formData.shift}
                            onChange={(e) => handleInputChange('shift', e.target.value)}
                            label="Turno"
                          >
                            {shifts.map((shift) => (
                              <MenuItem key={shift} value={shift}>
                                {shift}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Nombre del personal a cargo"
                          value={formData.staffName}
                          onChange={(e) => handleInputChange('staffName', e.target.value)}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth required variant="outlined">
                          <InputLabel>Modo de activación</InputLabel>
                          <Select
                            value={formData.activationMode}
                            onChange={(e) => handleInputChange('activationMode', e.target.value)}
                            label="Modo de activación"
                          >
                            {activationModes.map((mode) => (
                              <MenuItem key={mode} value={mode}>
                                {mode}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth required variant="outlined">
                          <InputLabel>Tipo de servicio</InputLabel>
                          <Select
                            value={formData.serviceType}
                            onChange={(e) => handleInputChange('serviceType', e.target.value)}
                            label="Tipo de servicio"
                          >
                            {serviceTypes.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Información de Atención */}
                <Grid size={{ xs: 12 }}>
                  <Paper sx={{ p: 3, bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                      🚨 Información de Atención
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Detalles de la respuesta y atención a la emergencia
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Fecha de atención"
                          type="date"
                          value={formData.attentionDate}
                          onChange={(e) => handleInputChange('attentionDate', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Hora de atención"
                          type="time"
                          value={formData.attentionTime}
                          onChange={(e) => handleInputChange('attentionTime', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Tiempo de traslado (minutos)"
                          type="number"
                          value={formData.travelTime}
                          onChange={(e) => handleInputChange('travelTime', e.target.value)}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Km recorridos"
                          type="number"
                          value={formData.kilometersTraveled}
                          onChange={(e) => handleInputChange('kilometersTraveled', e.target.value)}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          label="Ubicación"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="Dirección o descripción de la ubicación"
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Coordenadas GPS"
                          value={formData.gpsCoordinates}
                          onChange={(e) => handleInputChange('gpsCoordinates', e.target.value)}
                          placeholder="Latitud, Longitud"
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth required variant="outlined">
                          <InputLabel>Gravedad de la emergencia</InputLabel>
                          <Select
                            value={formData.severity}
                            onChange={(e) => handleInputChange('severity', e.target.value)}
                            label="Gravedad de la emergencia"
                          >
                            {severityLevels.map((level) => (
                              <MenuItem key={level} value={level}>
                                {level}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Trabajos y Observaciones */}
                <Grid size={{ xs: 12 }}>
                  <Paper sx={{ p: 3, bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: 'success.main', fontWeight: 'bold' }}>
                      🔧 Trabajos y Observaciones
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Detalles de las actividades realizadas y documentación
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label="Trabajos realizados"
                          value={formData.workPerformed}
                          onChange={(e) => handleInputChange('workPerformed', e.target.value)}
                          required
                          variant="outlined"
                          placeholder="Describa detalladamente los trabajos realizados durante la atención de la emergencia..."
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label="Observaciones"
                          value={formData.observations}
                          onChange={(e) => handleInputChange('observations', e.target.value)}
                          required
                          variant="outlined"
                          placeholder="Incluya observaciones importantes, condiciones encontradas, etc..."
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <Box sx={{ 
                          border: '2px dashed', 
                          borderColor: 'grey.300', 
                          borderRadius: 2, 
                          p: 3, 
                          textAlign: 'center',
                          bgcolor: 'grey.50'
                        }}>
                          <Typography variant="h6" gutterBottom>
                            📸 Fotografías
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Adjunte fotografías que documenten la emergencia y los trabajos realizados
                          </Typography>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            style={{ 
                              marginBottom: 16,
                              padding: '8px',
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              width: '100%'
                            }}
                          />
                          {formData.photos.length > 0 && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                              {formData.photos.map((photo, index) => (
                                <Chip
                                  key={index}
                                  label={photo.name}
                                  onDelete={() => removePhoto(index)}
                                  color="primary"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          )}
                        </Box>
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          label="Conclusión/Dictamen"
                          value={formData.conclusion}
                          onChange={(e) => handleInputChange('conclusion', e.target.value)}
                          required
                          variant="outlined"
                          placeholder="Proporcione una conclusión o dictamen sobre la situación atendida..."
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Responsables */}
                <Grid size={{ xs: 12 }}>
                  <Paper sx={{ p: 3, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: 'info.main', fontWeight: 'bold' }}>
                      👥 Responsables y Participantes
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Información de responsables y autoridades involucradas
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Responsable del inmueble/zona"
                          value={formData.responsiblePerson}
                          onChange={(e) => handleInputChange('responsiblePerson', e.target.value)}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Área responsable"
                          value={formData.responsibleArea}
                          onChange={(e) => handleInputChange('responsibleArea', e.target.value)}
                          required
                          variant="outlined"
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          label="Autoridades u dependencias participantes"
                          value={formData.participatingAuthorities}
                          onChange={(e) => handleInputChange('participatingAuthorities', e.target.value)}
                          placeholder="Seguridad Pública, Bomberos, Protección Civil, etc."
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Configuración del Reporte */}
                <Grid size={{ xs: 12 }}>
                  <Paper sx={{ p: 3, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.300' }}>
                    <Typography variant="h5" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold' }}>
                      ⚙️ Configuración del Reporte
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Seleccione el formato de salida para el reporte
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Formato del reporte</InputLabel>
                          <Select
                            value={formData.reportFormat}
                            onChange={(e) => handleInputChange('reportFormat', e.target.value)}
                            label="Formato del reporte"
                          >
                            <MenuItem value="pdf">PDF</MenuItem>
                            <MenuItem value="excel">Excel</MenuItem>
                            <MenuItem value="csv">CSV</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>

              {/* Botón de Envío */}
              <Box sx={{ 
                mt: 6, 
                display: 'flex', 
                justifyContent: 'center',
                p: 3,
                bgcolor: 'primary.50',
                borderRadius: 2,
                border: '2px solid',
                borderColor: 'primary.200'
              }}>
                <Button
                  variant="contained"
                  startIcon={<Description />}
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  size="large"
                  sx={{ 
                    px: 8, 
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isGenerating ? 'Generando Reporte...' : 'Generar Reporte de Emergencia'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          ¡Reporte generado exitosamente!
        </Alert>
      </Snackbar>
    </Box>
  );
};
