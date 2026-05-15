# Feature Specification: Multibagger Screener & Analysis Platform

**Feature Branch**: `001-multibagger-screener`

**Created**: 2026-05-15

**Status**: Approved

**Input**: User description: "Plataforma web para análisis de nichos de inversión, enfocada en activos multibagger (x5, x10+) activos en bolsa. Screener con filtros por tipo de activo, sector industrial, exchange, país ADR y multiplicador. Vista detallada con gráfico de precios interactivo, cálculo de revalorización dinámica, indicadores fundamentales y noticias."

## Clarifications Resolved

The following questions were raised during initial planning and resolved with the stakeholder:

| # | Question | Decision | Rationale |
|---|----------|----------|-----------|
| 1 | ¿Tienes una API key de FMP? | Usar plan gratuito de FMP (250 req/día) | Validar proyecto antes de invertir; cache agresivo mitiga el límite |
| 2 | ¿Supabase como DB o alternativa? | Supabase free tier | Hosting gratuito, integración nativa con PostgreSQL, suficiente para MVP |
| 3 | ¿Incluir crypto desde el inicio? | Sí, desde la primera versión | Es parte del screener multibagger; usuarios esperan ver crypto junto a acciones y ETFs |
| 4 | ¿Hosting de despliegue? | Vercel free tier | Integración nativa con Next.js, despliegue automático, suficiente para validación |

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Screener Multibagger (Priority: P1)

Un inversor quiere descubrir qué acciones, ETFs o criptomonedas han multiplicado su precio al menos 5x o 10x desde que comenzaron a cotizar en bolsa, y que aún estén activas. El inversor abre la plataforma y ve un panel de filtros donde puede seleccionar el tipo de activo, el factor de multiplicación mínimo, el sector industrial, el exchange y el país de origen. Al aplicar los filtros, obtiene una tabla con los activos que cumplen los criterios, mostrando nombre, símbolo, sector, exchange, multiplicación actual y precio.

**Why this priority**: Este es el corazón de la plataforma. Sin el screener, no hay producto. Define la propuesta de valor única: encontrar multibaggers confirmados de forma rápida y filtrada.

**Independent Test**: Se puede verificar buscando acciones tecnológicas que hayan multiplicado x10+ en NASDAQ y confirmando que los resultados incluyen activos conocidos (ej. NVIDIA, Apple, Tesla) con sus multiplicaciones correctas.

**Acceptance Scenarios**:

1. **Given** el usuario está en la pantalla principal, **When** selecciona tipo "Acciones", sector "Information Technology", exchange "NASDAQ" y multiplicador "x10", **Then** el sistema muestra una tabla con acciones tecnológicas del NASDAQ que han multiplicado al menos x10 su precio inicial.
2. **Given** el usuario tiene filtros aplicados mostrando resultados, **When** cambia el multiplicador de x10 a x5, **Then** la tabla se actualiza mostrando más resultados (ya que el umbral es menor).
3. **Given** el usuario busca por país "Argentina", **When** aplica el filtro, **Then** solo aparecen activos argentinos con ADR en bolsas de EEUU.
4. **Given** el usuario no ha aplicado ningún filtro, **When** accede a la pantalla principal, **Then** ve todos los multibaggers x5+ de todos los tipos, sectores y exchanges.
5. **Given** los resultados están cargados, **When** el usuario hace clic en el encabezado de columna "Multiplicación", **Then** los resultados se ordenan de mayor a menor multiplicación (o viceversa).

---

### User Story 2 - Vista Detallada con Gráfico de Precios (Priority: P2)

Un inversor ha encontrado un activo interesante en el screener y quiere analizarlo en profundidad. Hace clic en el activo y accede a una página dedicada donde ve el gráfico histórico de precios, la multiplicación total desde el inicio de cotización y puede seleccionar un punto temporal dentro del gráfico para calcular cuánto se revalorizó el activo desde ese momento específico.

**Why this priority**: Es la segunda interacción natural después de encontrar un activo en el screener. Sin la vista detallada, el screener es solo una tabla sin utilidad analítica. El gráfico interactivo es el diferenciador clave.

**Independent Test**: Se puede verificar navegando a la vista de un activo conocido (ej. NVDA), confirmando que el gráfico muestra precios históricos correctos, que la multiplicación total coincide con el cálculo manual (precio actual / precio más antiguo), y que al hacer clic en un punto del gráfico se recalcula la multiplicación desde esa fecha.

**Acceptance Scenarios**:

1. **Given** el usuario está en el screener, **When** hace clic en una fila de la tabla (ej. NVDA), **Then** navega a la página detallada de ese activo con su nombre, símbolo, sector, exchange y precio actual.
2. **Given** el usuario está en la vista detallada de un activo, **When** la página carga, **Then** ve un gráfico interactivo con el historial de precios completo y un badge indicando la multiplicación total (ej. "x283").
3. **Given** el gráfico está visible, **When** el usuario hace clic en un punto del gráfico (ej. enero 2020), **Then** el sistema muestra la multiplicación calculada desde esa fecha hasta hoy (ej. "x8.5 desde Ene 2020").
4. **Given** el usuario quiere cambiar el rango temporal, **When** selecciona "1Y" (un año), **Then** el gráfico se ajusta para mostrar solo los datos del último año.

---

### User Story 3 - Indicadores Fundamentales (Priority: P3)

Un inversor quiere evaluar si un multibagger aún tiene potencial de crecimiento. En la página de detalle del activo, accede a una sección con indicadores fundamentales actuales: EPS next year, EPS next 5 year, PE Forward, PEG, CAGR pasado y futuro, ventas, capitalización, ROIC y otros ratios financieros relevantes.

**Why this priority**: Los indicadores fundamentales complementan el análisis técnico del gráfico. Son esenciales para determinar si un multibagger sigue siendo una buena inversión o ya está sobrevaluado. Sin embargo, el screener y el gráfico aportan valor por sí solos.

**Independent Test**: Se puede verificar abriendo la vista de un activo conocido y comparando los indicadores mostrados contra los datos reportados en fuentes públicas (ej. Yahoo Finance, Finviz) para confirmar que los valores son correctos y están actualizados.

**Acceptance Scenarios**:

1. **Given** el usuario está en la vista detallada de un activo, **When** la sección de fundamentales carga, **Then** muestra los indicadores: EPS Next Year, EPS Next 5Y, PE Forward, PEG, CAGR Revenue (5Y pasado y futuro), Revenue, Market Cap y ROIC.
2. **Given** los indicadores están visibles, **When** un indicador es positivo (ej. ROIC > 15%), **Then** se muestra con indicador visual verde; si es negativo o bajo, en rojo o ámbar.
3. **Given** los datos de indicadores no están disponibles para un activo, **When** la página carga, **Then** muestra "N/A" en los campos sin datos, sin romper el layout.

---

### User Story 4 - Noticias del Activo (Priority: P4)

Un inversor quiere estar al tanto de las novedades recientes de un activo. En la página de detalle, accede a un panel con las últimas noticias relevantes del activo seleccionado.

**Why this priority**: Las noticias son un complemento valioso pero no central. El screener, el gráfico y los fundamentales ya entregan valor analítico completo. Las noticias agregan contexto temporal.

**Independent Test**: Se puede verificar abriendo la vista de un activo con cobertura mediática activa (ej. TSLA) y confirmando que las noticias son recientes, relevantes al activo y contienen título, fuente y fecha.

**Acceptance Scenarios**:

1. **Given** el usuario está en la vista detallada de un activo, **When** el panel de noticias carga, **Then** muestra las últimas 10-20 noticias con título, fuente, fecha y un enlace a la nota original.
2. **Given** no hay noticias disponibles para un activo, **When** el panel carga, **Then** muestra un mensaje informativo "No hay noticias recientes" sin errores.

---

### Edge Cases

- ¿Qué sucede cuando un activo no tiene datos históricos suficientes para calcular la multiplicación? → El sistema muestra la multiplicación basada en el dato más antiguo disponible con un indicador de "datos desde [fecha]".
- ¿Qué sucede si la API de datos financieros no responde? → El sistema muestra los datos en cache con un indicador de "datos actualizados hace X horas/días" y no se rompe la interfaz.
- ¿Qué sucede con activos que tuvieron splits? → El sistema usa precios ajustados por splits para que la multiplicación sea precisa.
- ¿Qué sucede si un activo fue delisted (retirado de bolsa)? → No aparece en los resultados del screener ya que solo se muestran activos activos.
- ¿Qué sucede con ETFs o criptos que no tienen "sector industrial"? → El filtro de sector solo aplica a acciones; para ETFs y crypto el filtro se desactiva o muestra categorías equivalentes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE mostrar un screener de activos multibagger con resultados en formato tabla.
- **FR-002**: El sistema DEBE permitir filtrar activos por tipo: Acciones, ETFs, Criptomonedas.
- **FR-003**: El sistema DEBE permitir filtrar por factor de multiplicación mínimo (x5, x10, x20, x50, x100).
- **FR-004**: El sistema DEBE permitir filtrar por sector industrial usando la clasificación GICS de 11 sectores del S&P 500.
- **FR-005**: El sistema DEBE permitir filtrar por exchange: NYSE, NASDAQ.
- **FR-006**: El sistema DEBE permitir filtrar por país de origen (activos con ADR en bolsas de EEUU).
- **FR-007**: El sistema DEBE calcular la multiplicación de cada activo como precio actual dividido por el precio histórico más antiguo disponible (o precio de IPO cuando esté disponible).
- **FR-008**: El sistema DEBE permitir ordenar los resultados del screener por cualquier columna (nombre, símbolo, sector, multiplicación, precio, market cap).
- **FR-009**: El sistema DEBE paginar los resultados del screener.
- **FR-010**: El sistema DEBE mostrar una vista detallada de cada activo con gráfico de precios interactivo.
- **FR-011**: El gráfico DEBE mostrar un overlay con la multiplicación total del activo.
- **FR-012**: El usuario DEBE poder seleccionar un punto temporal en el gráfico para recalcular la multiplicación desde esa fecha.
- **FR-013**: El gráfico DEBE permitir cambiar el rango temporal (1M, 3M, 6M, 1Y, 5Y, MAX).
- **FR-014**: La vista detallada DEBE mostrar indicadores fundamentales: EPS Next Year, EPS Next 5Y, PE Forward, PEG, CAGR Revenue, Revenue, Market Cap, ROIC.
- **FR-015**: La vista detallada DEBE mostrar las últimas noticias del activo.
- **FR-016**: El sistema DEBE usar precios ajustados por splits para cálculos de multiplicación.
- **FR-017**: El sistema DEBE cachear datos para operar dentro de los límites de la API gratuita.
- **FR-018**: El sistema DEBE mostrar indicadores de antigüedad de los datos cuando provengan del cache.

### Key Entities

- **Asset**: Representa un activo financiero (acción, ETF o criptomoneda). Atributos: símbolo, nombre, tipo, exchange, sector, industria, país, fecha de IPO, precio actual, precio histórico mínimo, multiplicación calculada, capitalización de mercado.
- **Price History**: Serie temporal de precios de un activo. Atributos: fecha, apertura, máximo, mínimo, cierre, volumen.
- **Asset Metrics**: Indicadores fundamentales de un activo. Atributos: EPS actual, EPS next year, EPS next 5Y, PE forward, PEG, CAGR revenue, revenue total, ROIC, ROE, debt-to-equity.
- **News Item**: Noticia relacionada a un activo. Atributos: título, resumen, fuente, fecha de publicación, URL original, símbolo relacionado.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El usuario puede encontrar un activo multibagger específico en menos de 30 segundos usando los filtros.
- **SC-002**: La tabla del screener muestra resultados correctos con multiplicaciones verificables contra fuentes públicas (margen de error < 5%).
- **SC-003**: El 100% de los activos mostrados en el screener están actualmente activos (listados en bolsa).
- **SC-004**: El gráfico interactivo permite seleccionar cualquier punto temporal y recalcula la multiplicación en menos de 1 segundo.
- **SC-005**: Los indicadores fundamentales coinciden con los datos de fuentes públicas con un margen de error < 2%.
- **SC-006**: La plataforma carga la página inicial en menos de 3 segundos.
- **SC-007**: La plataforma funciona correctamente con los límites del plan gratuito de la API de datos (250 requests/día) sin degradar la experiencia del usuario.

## Assumptions

- Los usuarios tienen conexión a internet estable para acceder a la plataforma.
- Los datos financieros provienen de una API externa con plan gratuito (250 requests/día); el cache mitiga esta limitación.
- Los precios históricos disponibles en el plan gratuito abarcan al menos 5 años; para activos con IPO anterior, se usará el dato más antiguo disponible como proxy.
- Solo se incluyen activos listados en bolsas de EEUU (NYSE, NASDAQ) y ADRs de empresas extranjeras en dichas bolsas.
- El soporte móvil es deseable pero no prioritario para la primera versión; se diseña desktop-first.
- No se requiere autenticación de usuario en la primera versión; la plataforma es de acceso público.
- Las criptomonedas se limitan a aquellas disponibles en la API de datos financieros seleccionada.
- La plataforma no ofrece asesoramiento financiero; es una herramienta de análisis informativo.
