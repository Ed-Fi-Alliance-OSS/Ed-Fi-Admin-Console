# Admin Console - Architecture

## Overview

This document provides an architectural overview of the health check process within the Admin Console, designed for managing multiple ODS/API instances in a centralized manner. It outlines the sequence of operations executed by the Health Check Service, which periodically retrieves configuration data from the Admin API, authenticates each instance, and performs health checks across all configured instances. The results of these checks are then posted back to the Admin Console for record-keeping and monitoring purposes. By automating health assessments across instances, this system ensures timely visibility into each instance's operational status, facilitating efficient maintenance and proactive issue resolution in a multi-tenant environment.

![Ed-Fi Admin Console - Architecture Diagram](<img/Ed-Fi Admin Console - Architecture Diagram.png>)
