/*
 * Quantum++
 *
 * Copyright (c) 2013 - 2016 Vlad Gheorghiu (vgheorgh@gmail.com)
 *
 * This file is part of Quantum++.
 *
 * Quantum++ is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Quantum++ is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Quantum++.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
* \file entanglement.h
* \brief Entanglement functions
*/

#ifndef ENTANGLEMENT_H_
#define ENTANGLEMENT_H_

// entanglement

namespace qpp
{

/**
* \brief Schmidt coefficients of the bi-partite pure state \a A
*
* \note The sum of the squares of the Schmidt coefficients equals 1
* \see qpp::schmidtprobs()
*
* \param A Eigen expression
* \param dims Dimensions of the bi-partite system
* \return Schmidt coefficients of \a A, as a real dynamic column vector
*/
template<typename Derived>
dyn_col_vect<double> schmidtcoeffs(const Eigen::MatrixBase<Derived>& A,
                                   const std::vector<idx>& dims)
{
    const dyn_mat<typename Derived::Scalar>& rA = A;

    // EXCEPTION CHECKS

    // check zero-size
    if (!internal::_check_nonzero_size(rA))
        throw Exception("qpp::schmidtcoeffs()", Exception::Type::ZERO_SIZE);
    // check bi-partite
    if (dims.size() != 2)
        throw Exception("qpp::schmidtcoeffs()", Exception::Type::NOT_BIPARTITE);
    // check column vector
    if (!internal::_check_cvector(rA))
        throw Exception("qpp::schmidtcoeffs()",
                        Exception::Type::MATRIX_NOT_CVECTOR);
    // check matching dimensions
    if (!internal::_check_dims_match_mat(dims, rA))
        throw Exception("qpp::schmidtcoeffs()",
                        Exception::Type::DIMS_MISMATCH_MATRIX);
    // END EXCEPTION CHECKS

    return svals(transpose(reshape(rA, dims[1], dims[0])));
}

/**
* \brief Schmidt basis on Alice side
*
* \param A Eigen expression
* \param dims Dimensions of the bi-partite system
* \return Unitary matrix \f$ U \f$ whose columns represent
* the Schmidt basis vectors on Alice side.
*/
template<typename Derived>
cmat schmidtA(const Eigen::MatrixBase<Derived>& A,
              const std::vector<idx>& dims)
{
    const dyn_mat<typename Derived::Scalar>& rA = A;

    // EXCEPTION CHECKS

    // check zero-size
    if (!internal::_check_nonzero_size(rA))
        throw Exception("qpp::schmidtU()", Exception::Type::ZERO_SIZE);
    // check bi-partite
    if (dims.size() != 2)
        throw Exception("qpp::schmidtU()", Exception::Type::NOT_BIPARTITE);
    // check column vector
    if (!internal::_check_cvector(rA))
        throw Exception("qpp::schmidtU()",
                        Exception::Type::MATRIX_NOT_CVECTOR);
    // check matching dimensions
    if (!internal::_check_dims_match_mat(dims, rA))
        throw Exception("qpp::schmidtU()",
                        Exception::Type::DIMS_MISMATCH_MATRIX);
    // END EXCEPTION CHECKS

    return svdU(transpose(reshape(rA, dims[1], dims[0])));
}

/**
* \brief Schmidt basis on Bob side
*
* \param A Eigen expression
* \param dims Dimensions of the bi-partite system
* \return Unitary matrix \f$ V \f$ whose columns represent
* the Schmidt basis vectors on Bob side.
*/
template<typename Derived>
cmat schmidtB(const Eigen::MatrixBase<Derived>& A,
              const std::vector<idx>& dims)
{
    const dyn_mat<typename Derived::Scalar>& rA = A;

    // EXCEPTION CHECKS

    // check zero-size
    if (!internal::_check_nonzero_size(rA))
        throw Exception("qpp::schmidtV()", Exception::Type::ZERO_SIZE);
    // check bi-partite
    if (dims.size() != 2)
        throw Exception("qpp::schmidtV()", Exception::Type::NOT_BIPARTITE);
    // check column vector
    if (!internal::_check_cvector(rA))
        throw Exception("qpp::schmidtV()",
                        Exception::Type::MATRIX_NOT_CVECTOR);
    // check matching dimensions
    if (!internal::_check_dims_match_mat(dims, rA))
        throw Exception("qpp::schmidtV()",
                        Exception::Type::DIMS_MISMATCH_MATRIX);
    // END EXCEPTION CHECKS

    // by default returns V^*, we need V, i.e. the complex conjugate,
    // i.e. adjoint(transpose(V))
    return svdV(transpose(reshape(conjugate(rA), dims[1], dims[0])));
}

/**
* \brief Schmidt probabilities of the bi-partite pure state \a A
*
* Defined as the squares of the Schmidt coefficients.
* The sum of the Schmidt probabilities equals 1.
* \see qpp::schmidtcoeffs()
*
* \param A Eigen expression
* \param dims Dimensions of the bi-partite system
* \return Real vector consisting of the Schmidt probabilites of \a A
*/
template<typename Derived>
std::vector<double> schmidtprobs(const Eigen::MatrixBase<Derived>& A,
                                 const std::vector<idx>& dims)
{
    const dyn_mat<typename Derived::Scalar>& rA = A;

    // EXCEPTION CHECKS

    // check zero-size
    if (!internal::_check_nonzero_size(rA))
        throw Exception("qpp::schmidtprobs()", Exception::Type::ZERO_SIZE);
    // check bi-partite
    if (dims.size() != 2)
        throw Exception("qpp::schmidtprobs()", Exception::Type::NOT_BIPARTITE);
    // check column vector
    if (!internal::_check_cvector(rA))
        throw Exception("qpp::schmidtprobs()",
                        Exception::Type::MATRIX_NOT_CVECTOR);
    // check matching dimensions
    if (!internal::_check_dims_match_mat(dims, rA))
        throw Exception("qpp::schmidtprobs()",
                        Exception::Type::DIMS_MISMATCH_MATRIX);
    // END EXCEPTION CHECKS

    std::vector<double> result;
    dyn_col_vect<double> scf = schmidtcoeffs(rA, dims);
    for (idx i = 0; i < static_cast<idx>(scf.rows()); ++i)
        result.push_back(std::pow(scf(i), 2));

    return result;
}

/**
* \brief Entanglement of the bi-partite pure state \a A
*
* Defined as the von-Neumann entropy of the reduced density matrix
* of one of the subsystems
* \see qpp::entropy()
*
* \param A Eigen expression
* \param dims Dimensions of the bi-partite system
* \return Entanglement, with the logarithm in base 2
*/
template<typename Derived>
double entanglement(const Eigen::MatrixBase<Derived>& A,
                    const std::vector<idx>& dims)
{
    const dyn_mat<typename Derived::Scalar>& rA = A;

    // EXCEPTION CHECKS

    // check zero-size
    if (!internal::_check_nonzero_size(rA))
        throw Exception("qpp::entanglement()", Exception::Type::ZERO_SIZE);
    // check bi-partite
    if (dims.size() != 2)
        throw Exception("qpp::entanglement()", Exception::Type::NOT_BIPARTITE);
    // check column vector
    if (!internal::_check_cvector(rA))
        throw Exception("qpp::entanglement()",
                        Exception::Type::MATRIX_NOT_CVECTOR);
    // check matching dimensions
    if (!internal::_check_dims_match_mat(dims, rA))
        throw Exception("qpp::entanglement()",
                        Exception::Type::DIMS_MISMATCH_MATRIX);
    // END EXCEPTION CHECKS

    return entropy(schmidtprobs(rA, dims));
}

/**
* \brief G-concurrence of the bi-partite pure state \a A
*
* \note Both local dimensions must be equal
*
* Uses qpp::logdet() to avoid overflows
* \see qpp::logdet()
*
* \param A Eigen expression
* \return G-concurrence
*/
template<typename Derived>
// the G-concurrence
double gconcurrence(const Eigen::MatrixBase<Derived>& A)
{
    const dyn_mat<typename Derived::Scalar>& rA = A;

    // EXCEPTION CHECKS

    // check zero-size
    if (!internal::_check_nonzero_size(rA))
        throw Exception("qpp::gconcurrence()", Exception::Type::ZERO_SIZE);
    // check column vector
    if (!internal::_check_cvector(rA))
        throw Exception("qpp::gconcurrence()",
                        Exception::Type::MATRIX_NOT_CVECTOR);

    // check equal local dimensions
    idx D = static_cast<idx>(std::llround(
            std::sqrt(static_cast<double>(rA.rows()))));
    if (D * D != static_cast<idx>(rA.rows()))
        throw Exception("qpp::gconcurrence()",
                        Exception::Type::DIMS_NOT_EQUAL);
    // END EXCEPTION CHECKS

    // we compute exp(logdet()) to avoid underflow
    return D * std::abs(std::exp(2. / D * logdet(reshape(rA, D, D))));
}

/**
* \brief Negativity of the bi-partite mixed state \a A
*
* \param A Eigen expression
* \param dims Dimensions of the bi-partite system
* \return Negativity
*/
template<typename Derived>
double negativity(const Eigen::MatrixBase<Derived>& A,
                  const std::vector<idx>& dims)
{
    const dyn_mat<typename Derived::Scalar>& rA = A;

    // EXCEPTION CHECKS

    // check zero-size
    if (!internal::_check_nonzero_size(rA))
        throw Exception("qpp::negativity()", Exception::Type::ZERO_SIZE);
    // check bi-partite
    if (dims.size() != 2)
        throw Exception("qpp::negativity()", Exception::Type::NOT_BIPARTITE);
    // check square matrix vector
    if (!internal::_check_square_mat(rA))
        throw Exception("qpp::negativity()",
                        Exception::Type::MATRIX_NOT_SQUARE);
    // check matching dimensions
    if (!internal::_check_dims_match_mat(dims, rA))
        throw Exception("qpp::negativity()",
                        Exception::Type::DIMS_MISMATCH_MATRIX);
    // END EXCEPTION CHECKS

    return (schatten(ptranspose(rA, {0}, dims), 1) - 1.) / 2.;
}

/**
* \brief Logarithmic negativity of the bi-partite mixed state \a A
*
* \param A Eigen expression
* \param dims Dimensions of the bi-partite system
* \return Logarithmic negativity, with the logarithm in base 2
*/
template<typename Derived>
double lognegativity(const Eigen::MatrixBase<Derived>& A,
                     const std::vector<idx>& dims)
{
    const dyn_mat<typename Derived::Scalar>& rA = A;

    // EXCEPTION CHECKS

    // check zero-size
    if (!internal::_check_nonzero_size(rA))
        throw Exception("qpp::lognegativity()", Exception::Type::ZERO_SIZE);
    // check bi-partite
    if (dims.size() != 2)
        throw Exception("qpp::lognegativity()",
                        Exception::Type::NOT_BIPARTITE);
    // check square matrix vector
    if (!internal::_check_square_mat(rA))
        throw Exception("qpp::lognegativity()",
                        Exception::Type::MATRIX_NOT_SQUARE);
    // check matching dimensions
    if (!internal::_check_dims_match_mat(dims, rA))
        throw Exception("qpp::lognegativity()",
                        Exception::Type::DIMS_MISMATCH_MATRIX);
    // END EXCEPTION CHECKS

    return std::log2(2 * negativity(rA, dims) + 1);
}

/**
* \brief Wootters concurrence of the bi-partite qubit mixed state \a A
*
* \param A Eigen expression
* \return Wootters concurrence
*/
template<typename Derived>
double concurrence(const Eigen::MatrixBase<Derived>& A)
{
    const dyn_mat<typename Derived::Scalar>& rA = A;

    // EXCEPTION CHECKS

    // check zero-size
    if (!internal::_check_nonzero_size(rA))
        throw Exception("qpp::concurrence()", Exception::Type::ZERO_SIZE);
    // check square matrix vector
    if (!internal::_check_square_mat(rA))
        throw Exception("qpp::concurrence()",
                        Exception::Type::MATRIX_NOT_SQUARE);
    // check that the state is a 2-qubit state
    if (rA.rows() != 4)
        throw Exception("qpp::concurrence()",
                        Exception::Type::NOT_QUBIT_SUBSYS);
    // END EXCEPTION CHECKS

    cmat sigmaY = Gates::get_instance().Y;
    dyn_col_vect<double> lambdas =
            evals(rA * kron(sigmaY, sigmaY) * conjugate(rA)
                  * kron(sigmaY, sigmaY)).real();

    std::vector<double> lambdas_sorted(lambdas.data(),
                                       lambdas.data() + lambdas.size());

    std::sort(std::begin(lambdas_sorted), std::end(lambdas_sorted),
              std::greater<double>());
    std::transform(std::begin(lambdas_sorted), std::end(lambdas_sorted),
                   std::begin(lambdas_sorted), [](double elem)
                   {
                       return std::sqrt(std::abs(elem));
                   }); // chop tiny negatives

    return std::max(0.,
                    lambdas_sorted[0] - lambdas_sorted[1] - lambdas_sorted[2]
                    - lambdas_sorted[3]);
}

} /* namespace qpp */

#endif /* ENTANGLEMENT_H_ */
