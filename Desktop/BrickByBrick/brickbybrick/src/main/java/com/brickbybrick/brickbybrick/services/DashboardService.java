package com.brickbybrick.brickbybrick.services;

import com.brickbybrick.brickbybrick.dto.AdminDashboardDTO;
import com.brickbybrick.brickbybrick.dto.AgenteDashboardDTO;
import com.brickbybrick.brickbybrick.dto.ClienteDashboardDTO;
import com.brickbybrick.brickbybrick.dto.NotificaDTO;

public interface DashboardService {

    AdminDashboardDTO getAdminDashboard();

    AgenteDashboardDTO getAgenteDashboard(Integer agenteId);

    ClienteDashboardDTO getClienteDashboard(Integer utenteId);

    NotificaDTO inviaNotificaAgente(Integer idAgente, String messaggio);

    NotificaDTO marcaNotificaComeLetta(Integer idNotifica);
}

