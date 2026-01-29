// Types for quotation submission
export interface QuotationFormData {
  name: string;
  email: string;
  venue: string;
  message: string;
}

export interface QuotationSubmitOptions {
  eventType?: string;
  pageUrl?: string;
}

export interface QuotationResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

/**
 * Submit a quotation request to the N8N reservations webhook
 * This calls our secure API route which handles authentication
 *
 * @param formData - The form data from the quotation form
 * @param options - Additional options like event type and page URL
 * @returns Promise with the response from the API
 */
export async function submitQuotationRequest(
  formData: QuotationFormData,
  options?: QuotationSubmitOptions
): Promise<QuotationResponse> {
  try {
    const payload = {
      ...formData,
      event_type: options?.eventType || 'general',
      page_url: options?.pageUrl || (typeof window !== 'undefined' ? window.location.href : ''),
      source: 'quotation_form',
    };

    const response = await fetch('/api/quotation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('[Quotation Client] Error submitting quotation:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit quotation request',
    };
  }
}
