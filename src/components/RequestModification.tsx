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
  Grid,
  Paper,
  Chip,
  Alert,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit,
  Send,
  CheckCircle,
  Pending,
  Cancel,
  Description,
  Person,
  CalendarToday,
  PriorityHigh,
  Assignment,
} from '@mui/icons-material';

interface ModificationRequest {
  id: string;
  folioNumber: string;
  reason: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  requestedBy: string;
  requestedAt: string;
  assignedTo?: string;
  comments?: string;
}

export const RequestModification: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    folioNumber: '',
    reason: '',
    priority: 'medium',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ModificationRequest | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [userRequests, setUserRequests] = useState<ModificationRequest[]>([]);

  // Datos de ejemplo para solicitudes existentes
  const existingRequests: ModificationRequest[] = [
    {
      id: '1',
      folioNumber: 'FOL-2024-001',
      reason: 'Necesito corregir mi número de teléfono que aparece incorrecto en el folio. El número actual es 555-1234 pero debería ser 555-5678. También requiero actualizar mi dirección de domicilio.',
      priority: 'high',
      status: 'in-review',
      requestedBy: 'Juan Pérez',
      requestedAt: '2024-01-20',
      assignedTo: 'María García',
      comments: 'En revisión por el equipo administrativo.',
    },
    {
      id: '2',
      folioNumber: 'FOL-2024-002',
      reason: 'Solicito cambio de correo electrónico porque el actual ya no está en uso. Necesito actualizar a mi nueva dirección de email.',
      priority: 'medium',
      status: 'approved',
      requestedBy: 'María López',
      requestedAt: '2024-01-18',
      assignedTo: 'Ana Martínez',
      comments: 'Aprobada. Se actualizará en el sistema.',
    },
    {
      id: '3',
      folioNumber: 'FOL-2024-003',
      reason: 'Hay un error en mi nombre completo en el folio. Falta mi segundo nombre "Alberto" en el registro actual.',
      priority: 'low',
      status: 'pending',
      requestedBy: 'Carlos Rodríguez',
      requestedAt: '2024-01-25',
    },
  ];


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in-review':
        return 'info';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'in-review':
        return 'En Revisión';
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Media';
      case 'low':
        return 'Baja';
      default:
        return priority;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    // Simular envío de solicitud
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Crear nueva solicitud
    const newRequest: ModificationRequest = {
      id: Date.now().toString(), // ID único basado en timestamp
      folioNumber: formData.folioNumber,
      reason: formData.reason,
      priority: formData.priority,
      status: 'pending',
      requestedBy: localStorage.getItem('username') || 'Usuario',
      requestedAt: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
    };
    
    // Agregar la nueva solicitud al estado local
    setUserRequests(prev => [newRequest, ...prev]);
    
    setShowSuccess(true);
    setActiveStep(0);
    setFormData({
      folioNumber: '',
      reason: '',
      priority: 'medium',
    });
  };

  const handleViewRequest = (request: ModificationRequest) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
  };

  const steps = [
    {
      label: 'Información del Folio',
      description: 'Ingresa el número de folio',
    },
    {
      label: 'Razón de la Solicitud',
      description: 'Describe la modificación que necesitas',
    },
    {
      label: 'Revisión y Envío',
      description: 'Revisa tu solicitud antes de enviarla',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Solicitar Modificación
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {step.description}
                      </Typography>

                      {index === 0 && (
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Número de Folio"
                              value={formData.folioNumber}
                              onChange={(e) => handleInputChange('folioNumber', e.target.value)}
                              placeholder="Ej: FOL-2024-001"
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <InputLabel>Prioridad</InputLabel>
                              <Select
                                value={formData.priority}
                                onChange={(e) => handleInputChange('priority', e.target.value)}
                                label="Prioridad"
                              >
                                <MenuItem value="low">Baja</MenuItem>
                                <MenuItem value="medium">Media</MenuItem>
                                <MenuItem value="high">Alta</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      )}

                      {index === 1 && (
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            Razón de la Solicitud
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Describe detalladamente qué modificación necesitas realizar en el folio y por qué es necesaria.
                          </Typography>
                          
                          <TextField
                            fullWidth
                            multiline
                            rows={8}
                            label="Razón de la Modificación"
                            value={formData.reason}
                            onChange={(e) => handleInputChange('reason', e.target.value)}
                            placeholder="Ejemplo: Necesito corregir mi número de teléfono que aparece incorrecto en el folio. El número actual es 555-1234 pero debería ser 555-5678. También requiero actualizar mi dirección de domicilio porque me mudé a una nueva casa..."
                            required
                          />
                        </Box>
                      )}

                      {index === 2 && (
                        <Box>
                          <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                            <Typography variant="h6" gutterBottom>
                              Resumen de la Solicitud de Modificación
                            </Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  Número de Folio
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">{formData.folioNumber}</Typography>
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  Prioridad
                                </Typography>
                                <Chip
                                  label={getPriorityLabel(formData.priority)}
                                  color={getPriorityColor(formData.priority) as any}
                                  size="small"
                                />
                              </Box>
                            </Box>
                            
                            <Box>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                Razón de la Modificación
                              </Typography>
                              <Paper sx={{ p: 2, bgcolor: 'white', border: '1px solid #e0e0e0' }}>
                                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                  {formData.reason}
                                </Typography>
                              </Paper>
                            </Box>
                          </Paper>
                        </Box>
                      )}

                      <Box sx={{ mt: 2 }}>
                        <Button
                          variant="contained"
                          onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                          disabled={
                            (index === 0 && !formData.folioNumber) ||
                            (index === 1 && !formData.reason.trim())
                          }
                          startIcon={index === steps.length - 1 ? <Send /> : undefined}
                        >
                          {index === steps.length - 1 ? 'Enviar Solicitud' : 'Continuar'}
                        </Button>
                        {index > 0 && (
                          <Button onClick={handleBack} sx={{ ml: 1 }}>
                            Atrás
                          </Button>
                        )}
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Mis Solicitudes Recientes
            </Typography>
            {userRequests.length === 0 && existingRequests.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No hay solicitudes recientes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Envía tu primera solicitud de modificación
                </Typography>
              </Box>
            ) : (
              <Box>
                {/* Mostrar primero las solicitudes del usuario (más recientes) */}
                {userRequests.slice(0, 5).map((request) => (
                <Card 
                  key={request.id}
                  sx={{ 
                    mb: 2,
                    bgcolor: 'primary.50',
                    border: '1px solid',
                    borderColor: 'primary.200',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'primary.100',
                      transform: 'translateY(-2px)',
                      boxShadow: 2
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onClick={() => handleViewRequest(request)}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ mt: 0.5 }}>
                        {request.status === 'approved' && <CheckCircle color="success" />}
                        {request.status === 'in-review' && <Pending color="info" />}
                        {request.status === 'pending' && <Pending color="warning" />}
                        {request.status === 'rejected' && <Cancel color="error" />}
                      </Box>
                      
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            Folio: {request.folioNumber}
                          </Typography>
                          <Chip 
                            label="Nueva" 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                          <Chip
                            label={getStatusLabel(request.status)}
                            color={getStatusColor(request.status) as any}
                            size="small"
                          />
                          <Chip
                            label={getPriorityLabel(request.priority)}
                            color={getPriorityColor(request.priority) as any}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: 1.4
                          }}
                        >
                          {request.reason}
                        </Typography>
                        
                        <Typography variant="caption" color="text.secondary">
                          <CalendarToday sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                          {new Date(request.requestedAt).toLocaleDateString('es-MX')}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
              
              {/* Si no hay solicitudes del usuario, mostrar las existentes de ejemplo */}
              {userRequests.length === 0 && existingRequests.slice(0, 3).map((request) => (
                <Card 
                  key={request.id}
                  sx={{ 
                    mb: 2,
                    bgcolor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                      boxShadow: 2
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onClick={() => handleViewRequest(request)}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ mt: 0.5 }}>
                        {request.status === 'approved' && <CheckCircle color="success" />}
                        {request.status === 'in-review' && <Pending color="info" />}
                        {request.status === 'pending' && <Pending color="warning" />}
                        {request.status === 'rejected' && <Cancel color="error" />}
                      </Box>
                      
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
                          Folio: {request.folioNumber}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                          <Chip
                            label={getStatusLabel(request.status)}
                            color={getStatusColor(request.status) as any}
                            size="small"
                          />
                          <Chip
                            label={getPriorityLabel(request.priority)}
                            color={getPriorityColor(request.priority) as any}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            mb: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: 1.4
                          }}
                        >
                          {request.reason}
                        </Typography>
                        
                        <Typography variant="caption" color="text.secondary">
                          <CalendarToday sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                          {new Date(request.requestedAt).toLocaleDateString('es-MX')}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                ))}
              </Box>
            )}
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Información del Usuario
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Person sx={{ mr: 1, color: 'action.active' }} />
              <Typography variant="body2">
                {localStorage.getItem('username') || 'Admin'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarToday sx={{ mr: 1, color: 'action.active' }} />
              <Typography variant="body2">
                {new Date().toLocaleDateString('es-MX')}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog para ver detalles de solicitud */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ mr: 1 }} />
            Detalles de la Solicitud
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Folio: {selectedRequest.folioNumber}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Chip
                  label={getStatusLabel(selectedRequest.status)}
                  color={getStatusColor(selectedRequest.status) as any}
                  size="small"
                />
                <Chip
                  label={getPriorityLabel(selectedRequest.priority)}
                  color={getPriorityColor(selectedRequest.priority) as any}
                  size="small"
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Razón de la Modificación
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'grey.50', border: '1px solid #e0e0e0' }}>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {selectedRequest.reason}
                  </Typography>
                </Paper>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Solicitado por
                  </Typography>
                  <Typography variant="body1">{selectedRequest.requestedBy}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Fecha
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedRequest.requestedAt).toLocaleDateString('es-MX')}
                  </Typography>
                </Box>
                {selectedRequest.assignedTo && (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Asignado a
                    </Typography>
                    <Typography variant="body1">{selectedRequest.assignedTo}</Typography>
                  </Box>
                )}
              </Box>
              
              {selectedRequest.comments && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Comentarios
                  </Typography>
                  <Typography variant="body1">
                    {selectedRequest.comments}
                  </Typography>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          ¡Solicitud enviada exitosamente! Puedes verla en "Mis Solicitudes Recientes".
        </Alert>
      </Snackbar>
    </Box>
  );
};
