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
* \file input_output.h
* \brief Input/output functions
*/

#ifndef INPUT_OUTPUT_H_
#define INPUT_OUTPUT_H_

// input/output

namespace qpp
{

/**
* \brief Eigen expression ostream manipulator
*
* \param A Eigen expression
* \param chop Set to zero the elements smaller in absolute value
* than \a chop
* \return Instance of qpp::internal::internal::IOManipEigen
*/
template<typename Derived>
internal::IOManipEigen disp(const Eigen::MatrixBase<Derived>& A,
                            double chop = qpp::chop)
{
    return internal::IOManipEigen(A, chop);
}

/**
* \brief Complex number ostream manipulator
*
* \param z Complex number (or any other type implicitly cast-able
* to std::complex<double>)
* \param chop Set to zero the elements smaller in absolute value
* than \a chop
* \return Instance of qpp::internal::internal::IOManipEigen
*/
inline internal::IOManipEigen disp(cplx z, double chop = qpp::chop)
{
    return internal::IOManipEigen(z, chop);
}

/**
* \brief Range ostream manipulator
*
* \param first Iterator to the first element of the range
* \param last  Iterator to the last element of the range
* \param separator Separator
* \param start Left marking
* \param end Right marking
* \return Instance of qpp::internal::internal::IOManipRange
*/
template<typename InputIterator>
internal::IOManipRange <InputIterator> disp(InputIterator first,
                                            InputIterator last,
                                            const std::string& separator,
                                            const std::string& start = "[",
                                            const std::string& end = "]")
{
    return internal::IOManipRange<InputIterator>(
            first, last, separator, start, end);
}

/**
* \brief Standard container ostream manipulator. The container must support
* std::begin(), std::end() and forward iteration.
*
* \param c Container
* \param separator Separator
* \param start Left marking
* \param end Right marking
* \return Instance of qpp::internal::internal::IOManipRange
*/
template<typename Container>
internal::IOManipRange<typename Container::const_iterator> disp(
        const Container& c, const std::string& separator,
        const std::string& start = "[", const std::string& end = "]")
{
    return internal::IOManipRange<typename Container::const_iterator>(
            std::begin(c), std::end(c), separator, start, end);
}

/**
* \brief C-style pointer ostream manipulator
*
* \param p Pointer to the first element
* \param n Number of elements to be displayed
* \param separator Separator
* \param start Left marking
* \param end Right marking
* \return Instance of qpp::internal::internal::IOManipPointer
*/
template<typename PointerType>
internal::IOManipPointer <PointerType> disp(const PointerType* p, idx n,
                                            const std::string& separator,
                                            const std::string& start = "[",
                                            const std::string& end = "]")
{
    return internal::IOManipPointer<PointerType>(p, n, separator, start, end);
}

/**
* \brief Saves Eigen expression to a binary file (internal format) in double
* precision
* \see qpp::load()
*
* \param A Eigen expression
* \param fname Output file name
*/
template<typename Derived>
void save(const Eigen::MatrixBase<Derived>& A, const std::string& fname)
{
    const dyn_mat<typename Derived::Scalar>& rA = A;

    // EXCEPTION CHECKS

    // check zero-size
    if (!internal::_check_nonzero_size(rA))
        throw Exception("qpp::save()", Exception::Type::ZERO_SIZE);

    std::fstream fout;
    fout.open(fname, std::ios::out | std::ios::binary);

    if (fout.fail())
    {
        throw std::runtime_error(
                "qpp::save(): Error writing output file \""
                + std::string(fname) + "\"!");
    }
    // END EXCEPTION CHECKS

    // write the header to file
    const char _header[] = "TYPE::Eigen::Matrix";
    fout.write(_header, sizeof(_header));

    idx rows = static_cast<idx>(rA.rows());
    idx cols = static_cast<idx>(rA.cols());
    fout.write((char*) &rows, sizeof(rows));
    fout.write((char*) &cols, sizeof(cols));

    fout.write((char*) rA.data(),
               sizeof(typename Derived::Scalar) * rows * cols);

    fout.close();
}

/**
* \brief Loads Eigen matrix from a binary file (internal format) in double
* precision
* \see qpp::save()
*
* The template parameter cannot be automatically deduced and
* must be explicitly provided, depending on the scalar field of the matrix
* that is being loaded.
*
* Example:
* \code
* // loads a previously saved Eigen dynamic complex matrix from "input.bin"
* auto mat = load<cmat>("input.bin");
* \endcode
*
* \param A Eigen expression
* \param fname Output file name
*/
template<typename Derived>
dyn_mat<typename Derived::Scalar> load(const std::string& fname)
{
    std::fstream fin;
    fin.open(fname, std::ios::in | std::ios::binary);

    // EXCEPTION CHECKS

    if (fin.fail())
    {
        throw std::runtime_error(
                "qpp::load(): Error opening input file \""
                + std::string(fname) + "\"!");
    }

    const char _header[] = "TYPE::Eigen::Matrix";
    char* _fheader = new char[sizeof(_header)];

    // read the header from file
    fin.read(_fheader, sizeof(_header));
    if (strcmp(_fheader, _header))
    {
        delete[] _fheader;
        throw std::runtime_error(
                "qpp::load(): Input file \"" + std::string(fname)
                + "\" is corrupted!");
    }
    delete[] _fheader;
    // END EXCEPTION CHECKS

    idx rows, cols;
    fin.read((char*) &rows, sizeof(rows));
    fin.read((char*) &cols, sizeof(cols));

    dyn_mat<typename Derived::Scalar> A(rows, cols);

    fin.read((char*) A.data(),
             sizeof(typename Derived::Scalar) * rows * cols);

    fin.close();

    return A;
}

} /* namespace qpp */

#endif /* INPUT_OUTPUT_H_ */
