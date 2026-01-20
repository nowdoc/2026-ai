declare namespace Api {
  type FilterOrder = 'asc' | 'desc'

  type StatusType = 'ok' | 'error'

  namespace Request {

    interface Filter {
      q?: Record<string, string>
      qs?: string
      l?: number
      p?: number
      o?: Record<string, FilterOrder>
    }
  }

  namespace Response {
    interface Metadata {
      meta: {
        pagination: {
          page: number
          total: number
        }
      }
    }
  }

  namespace Verso {
    interface GetDeploymentsRequest {
      filter: Api.Request.Filter
    }

    interface GetDeploymentsResponse extends Response.Metadata {
      data: {
        id: number | null
        deployedAt: string
        version: string | null
        service: number | null
        installation: string
      }[]
    }

    interface GetReleasesRequest {
      filter: Api.Request.Filter
    }

    interface GetReleasesResponse extends Response.Metadata {
      data: any[]
    }

    interface GetServicesRequest {
      filter: Api.Request.Filter
    }

    interface GetServicesResponse  extends Response.Metadata {
      data: {
        id: number | null
        deployedAt: string
        version: string | null
        service: number | null
      }[]
    }

    interface GetInstallationsRequest {
      filter: Api.Request.Filter
    }

    interface GetInstallationsResponse  extends Response.Metadata {
      data: {
        value: string | null
        label: string | null
      }[]
    }

    interface GetCustomizationsRequest {
      filter: Api.Request.Filter
    }

    interface GetCustomizationsResponse extends Response.Metadata {
      data: {
        id: number | null
        code: string | null
        name: string | null
        createdAt: string
        updatedAt: string
        notes: string | null
        state: any
        epic: any
        category: any
        product: any
        deadline: any
        updates: any
        old_code: any
        installation: {
          code: string
        }
      }[]
    }

    interface GetFeaturesRequest {
      filter: Api.Request.Filter
    }

    interface GetFeaturesResponse  extends Response.Metadata {
      data: any[]
    }
  }

  namespace Consul {
    interface GetServiceRequest {
      id: String,
      installation: String,
      service: String,
      dc: String,
    }

    interface GetServiceResponse {
    }
  }
}
